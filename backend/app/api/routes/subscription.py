from fastapi import APIRouter, Depends, HTTPException
from app.models import SubscriptionStatus, User
from typing import Annotated, List
from pydantic import BaseModel
import stripe
from stripe.error import StripeError
import os
import logging
from datetime import datetime
from app.api.deps import get_current_user

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load Stripe API key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
stripe.api_version = "2023-10-16"  # Use stable version to avoid issues

router = APIRouter(tags=["subscription"])

# Pydantic model for customer response
class CustomerResponse(BaseModel):
    id: str
    email: str | None
    name: str | None
    created: int
    description: str | None

# Pydantic model for subscription response
class SubscriptionResponse(BaseModel):
    id: str
    status: str
    plan_id: str | None
    plan_name: str | None
    product_id: str | None
    product_name: str | None
    current_period_start: int | None
    current_period_end: int | None
    trial_start: int | None
    trial_end: int | None
    cancel_at_period_end: bool
    metadata: dict | None

# Pydantic model for proxy API access response
class ProxyApiAccessResponse(BaseModel):
    has_access: bool
    message: str | None

@router.get("/customer", response_model=CustomerResponse)
async def get_customer(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Fetch the Stripe customer details for the authenticated user.
    """
    logger.info(f"Fetching customer for user: {current_user.email}")

    if not stripe.api_key:
        logger.error("Stripe API key is not configured")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing Stripe API key")

    if not current_user.stripe_customer_id:
        logger.warning(f"No Stripe customer ID for user: {current_user.email}")
        raise HTTPException(status_code=404, detail="No Stripe customer associated with this user")

    try:
        customer = stripe.Customer.retrieve(current_user.stripe_customer_id)
        logger.info(f"Retrieved customer: {current_user.stripe_customer_id}")

        return CustomerResponse(
            id=customer.id,
            email=customer.email,
            name=customer.name,
            created=customer.created,
            description=customer.description
        )

    except StripeError as e:
        logger.error(f"Stripe error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to fetch customer: {str(e)}")
    except Exception as e:
        logger.error(f"Internal server error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/customer/subscriptions", response_model=List[SubscriptionResponse])
async def get_customer_subscriptions(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Fetch all subscriptions for the authenticated user's Stripe customer, including tier details.
    """
    logger.info(f"Fetching subscriptions for user: {current_user.email}")

    if not stripe.api_key:
        logger.error("Stripe API key is not configured")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing Stripe API key")

    if not current_user.stripe_customer_id:
        logger.warning(f"No Stripe customer ID for user: {current_user.email}")
        raise HTTPException(status_code=404, detail="No Stripe customer associated with this user")

    try:
        subscriptions = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status="all",
            expand=["data.plan.product"]
        )
        logger.info(f"Retrieved {len(subscriptions.data)} subscriptions for customer: {current_user.stripe_customer_id}")

        subscription_list = []
        for sub in subscriptions.data:
            # Log all subscriptions with detailed information
            log_details = {
                "subscription_id": sub.id,
                "status": sub.status,
                "current_period_start": getattr(sub, "current_period_start", None),
                "current_period_end": getattr(sub, "current_period_end", None),
                "plan_id": sub.plan.id if sub.plan else None,
                "plan_name": sub.plan.nickname if sub.plan and sub.plan.nickname else None,
                "product_id": sub.plan.product.id if sub.plan and sub.plan.product else None,
                "product_name": (
                    sub.plan.product.name
                    if sub.plan and sub.plan.product and hasattr(sub.plan.product, "name")
                    else None
                ),
                "metadata": (
                    sub.plan.product.metadata
                    if sub.plan and sub.plan.product and hasattr(sub.plan.product, "metadata")
                    else None
                ),
                "trial_start": sub.trial_start,
                "trial_end": sub.trial_end,
                "cancel_at_period_end": sub.cancel_at_period_end
            }
            logger.info(f"Subscription details: {log_details}")

            # Include active, trialing, or past_due subscriptions
            if sub.status not in ["active", "trialing", "past_due"]:
                logger.warning(f"Skipping subscription {sub.id} with status {sub.status}")
                continue

            plan_id = sub.plan.id if sub.plan else None
            plan_name = sub.plan.nickname if sub.plan and sub.plan.nickname else None
            product_id = sub.plan.product.id if sub.plan and sub.plan.product else None
            product_name = (
                sub.plan.product.name
                if sub.plan and sub.plan.product and hasattr(sub.plan.product, "name")
                else None
            )
            metadata = (
                sub.plan.product.metadata
                if sub.plan and sub.plan.product and hasattr(sub.plan.product, "metadata")
                else None
            )

            subscription_list.append(
                SubscriptionResponse(
                    id=sub.id,
                    status=sub.status,
                    plan_id=plan_id,
                    plan_name=plan_name,
                    product_id=product_id,
                    product_name=product_name,
                    current_period_start=sub.current_period_start if hasattr(sub, "current_period_start") else None,
                    current_period_end=sub.current_period_end if hasattr(sub, "current_period_end") else None,
                    trial_start=sub.trial_start,
                    trial_end=sub.trial_end,
                    cancel_at_period_end=sub.cancel_at_period_end,
                    metadata=metadata
                )
            )

        return subscription_list

    except StripeError as e:
        logger.error(f"Stripe error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to fetch subscriptions: {str(e)}")
    except Exception as e:
        logger.error(f"Internal server error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/subscription-status", response_model=SubscriptionStatus)
async def get_subscription_status(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Retrieve the subscription status for the authenticated user from Stripe.
    """
    logger.info(f"Fetching subscription status for user: {current_user.email}")

    if not stripe.api_key:
        logger.error("Stripe API key is not configured")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing Stripe API key")

    if not current_user.stripe_customer_id:
        logger.warning(f"No Stripe customer ID for user: {current_user.email}")
        return SubscriptionStatus(
            hasSubscription=False,
            isTrial=False,
            isDeactivated=True
        )

    try:
        subscriptions = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status="all",
            limit=1
        )
        logger.info(f"Retrieved subscriptions for customer: {current_user.stripe_customer_id}")

        if not subscriptions.data:
            logger.info(f"No subscriptions found for customer: {current_user.stripe_customer_id}")
            return SubscriptionStatus(
                hasSubscription=False,
                isTrial=False,
                isDeactivated=True
            )

        subscription = subscriptions.data[0]
        has_subscription = subscription.status in ["active", "trialing", "past_due"]
        is_trial = subscription.status == "trialing"
        is_deactivated = subscription.status in ["canceled", "unpaid", "incomplete_expired"]

        return SubscriptionStatus(
            hasSubscription=has_subscription,
            isTrial=is_trial,
            isDeactivated=is_deactivated
        )

    except StripeError as e:
        logger.error(f"Stripe error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to fetch subscription status: {str(e)}")
    except Exception as e:
        logger.error(f"Internal server error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/proxy-api/access", response_model=ProxyApiAccessResponse)
async def check_proxy_api_access(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Check if the user has access to proxy API features based on the proxy-api tag in subscription metadata.
    """
    logger.info(f"Checking proxy API access for user: {current_user.email}")

    if not stripe.api_key:
        logger.error("Stripe API key is not configured")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing Stripe API key")

    if not current_user.stripe_customer_id:
        logger.warning(f"No Stripe customer ID for user: {current_user.email}")
        return ProxyApiAccessResponse(
            has_access=False,
            message="No subscription found. Please subscribe to a plan with proxy API features."
        )

    try:
        subscriptions = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status="all",
            expand=["data.plan.product"]
        )
        logger.info(f"Retrieved {len(subscriptions.data)} subscriptions for customer: {current_user.stripe_customer_id}")

        for sub in subscriptions.data:
            # Log subscription details
            log_details = {
                "subscription_id": sub.id,
                "status": sub.status,
                "current_period_start": getattr(sub, "current_period_start", None),
                "product_id": sub.plan.product.id if sub.plan and sub.plan.product else None,
                "metadata": (
                    sub.plan.product.metadata
                    if sub.plan and sub.plan.product and hasattr(sub.plan.product, "metadata")
                    else None
                )
            }
            logger.info(f"Proxy API check - Subscription details: {log_details}")

            # Check for active subscription with proxy-api tag
            if sub.status in ["active", "trialing"]:
                metadata = (
                    sub.plan.product.metadata
                    if sub.plan and sub.plan.product and hasattr(sub.plan.product, "metadata")
                    else {}
                )
                if metadata.get("proxy-api") == "true":
                    return ProxyApiAccessResponse(
                        has_access=True,
                        message="Access granted to proxy API features."
                    )

        return ProxyApiAccessResponse(
            has_access=False,
            message="Your subscription plan does not include proxy API features. Please upgrade to a proxy-api-enabled plan."
        )

    except StripeError as e:
        logger.error(f"Stripe error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to check proxy API access: {str(e)}")
    except Exception as e:
        logger.error(f"Internal server error for user {current_user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Add this new endpoint to your subscription.py file

@router.get("/serp-api/access", response_model=ProxyApiAccessResponse)
async def check_serp_api_access(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Check if the user has access to SERP API features based on a 'serp-api'
    tag in their active or trialing subscription's product metadata.
    """
    logger.info(f"Checking SERP API access for user: {current_user.email}")
    
    # 1. Boilerplate: Check for server and user configuration
    if not stripe.api_key:
        logger.error("Stripe API key is not configured")
        raise HTTPException(status_code=500, detail="Server configuration error: Missing Stripe API key")
    if not current_user.stripe_customer_id:
        logger.warning(f"No Stripe customer ID for user: {current_user.email}")
        return ProxyApiAccessResponse(
            has_access=False,
            message="No active subscription found for your account."
        )

    try:
        # 2. Fetch all potentially relevant subscriptions (active and trialing)
        active_subscriptions = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status="active",
            expand=["data.plan.product"],
        )
        trial_subscriptions = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status="trialing",
            expand=["data.plan.product"],
        )
        
        all_relevant_subscriptions = active_subscriptions.data + trial_subscriptions.data
        logger.info(f"Found {len(all_relevant_subscriptions)} active/trialing subscriptions for {current_user.email}")

        # 3. The Core Logic: Iterate and check metadata
        for sub in all_relevant_subscriptions:
            product = sub.plan.product if sub.plan and hasattr(sub.plan, 'product') else None
            metadata = product.metadata if product else {}
            
            logger.info(f"Checking subscription {sub.id} for SERP API access. Metadata: {metadata}")
            
            # The key change is here: check for 'serp-api' instead of 'proxy-api'
            if metadata.get("serp-api") == "true":
                logger.info(f"SERP API access GRANTED for user {current_user.email} via subscription {sub.id}")
                return ProxyApiAccessResponse(
                    has_access=True,
                    message="Your plan includes SERP API access."
                )

        # 4. If the loop completes, no access was found
        logger.warning(f"SERP API access DENIED for user {current_user.email}. No plan with 'serp-api: true' metadata found.")
        return ProxyApiAccessResponse(
            has_access=False,
            message="Your current plan does not include SERP API access. Please upgrade your plan."
        )

    except StripeError as e:
        logger.error(f"Stripe error checking SERP API access for {current_user.email}: {e.user_message}")
        raise HTTPException(status_code=e.http_status or 400, detail=e.user_message)
    except Exception as e:
        logger.error(f"Internal server error checking SERP API access for {current_user.email}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="An internal server error occurred.")