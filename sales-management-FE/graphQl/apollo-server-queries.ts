"use server";
import {
  AccountPromotions,
  AccountSpecificFeatureOverrideResponse,
  ActiveTemplateT,
  ArchieveFeature,
  CampaignSearchHits,
  CommonResponse,
  CommonResult,
  ConfigFormInputT,
  ConfigResponse,
  CreateFeatureFlagT,
  CurrentUserT,
  EditFeatureFlagT,
  EditResponseAccountSpecific,
  Entity,
  FeatureFlagHistoryT,
  FeatureFlagT,
  FeatureFlagVariableT,
  getAccountIdT,
  GetAllFeatureOverridesResponse,
  GetFeatureOverridesAccountT,
  GetOneCampaignResponse,
  getPromotionResponseT,
  PromotionUpdateT,
  Result,
  UpdateCampaignT,
  UpdateFeatureRequest,
  userAccountsT,
  getAccountIds,
  CampaignResponseT,
  InputPayloadT,
  UserEntity,
} from "../types";
import { fetchQuery, Mutation } from "./apollo-server";
import {
  AccountPromoList,
  ActivateFeature,
  ArchieveGlobalFeatureFlag,
  CampaignIdList,
  CampaignList,
  CREATE_CONFIG,
  CreateCampaign,
  CreateFeatureFlag,
  CreateFeatureOverride,
  CreatePromotion,
  DeactivateFeature,
  getAccountId,
  GetActivePromotion,
  getAllFeatureOverrides,
  GetFeature,
  GetFeatureHistory,
  GetFeatureOverRiddenAccount,
  GetFeatureOverrides,
  getGroupId,
  getinternalUsers,
  GetOneCampaign,
  GetOverriddenFeatureHistory,
  GetPromotion,
  getUsers,
  ListAllFeatureFlag,
  LOGGED_IN_HEADER,
  PromotionList,
  UPDATE_CONFIG,
  UpdateCampaign,
  UpdateFeatureFlag,
  UpdateFeatureOverride,
  UpdatePromotion,
} from "./queries/UserQueries";

export const updateConfig = async ({
  variables,
}: {
  variables: ConfigFormInputT;
}): Promise<CommonResult<ConfigResponse>> => {
  const res: CommonResult<ConfigResponse> = await Mutation<ConfigResponse>(
    UPDATE_CONFIG,
    variables
  );
  return res;
};

export const campaignManagementList = async ({
  variables,
}: {
  variables: FeatureFlagVariableT;
}): Promise<CommonResult<CommonResponse<Result<CampaignSearchHits>>>> => {
  const res: CommonResult<CommonResponse<Result<CampaignSearchHits>>> =
    await fetchQuery<CommonResponse<Result<CampaignSearchHits>>>(
      CampaignList,
      variables
    );
  return res;
};
