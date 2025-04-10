export type OptionsT = {
  label: string;
  value: string;
};
export type PaginationOptionsT = {
  label: number;
  value: number;
};
export type ComponentProps = {
  params?: {
    slug: string | undefined;
  };
};
export type Params = {
  slug: string;
};
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

type ConfigType = "arrayOfString" | "arrayOfObject";

export type ConfigListResponse = {
  id: string;
  title: string;
  configValues?:
    | string[]
    | Record<string, string>[]
    | Record<string, Record<string, string>>[];
  createdAt?: string | null;
  updatedAt?: string | null;
  type?: ConfigType;
  path: string;
  campaignData?: ConfigListResponse[];
  createdBy?: {
    service: string;
    serviceDetail: string;
  };
  updatedBy?: {
    service: string;
    serviceDetail: string;
  };
  version?: number;
};

export type CommonResult<T> = {
  data: T | null | undefined;
  message?: string;
  success: boolean;
  loading: boolean;
};
export type UpdateCampaignT = {
  success: boolean;
  message: string;
};

export type ConfigDataT = {
  getConfigList: ConfigListResponse[];
};

type AuthPayload = {
  sub: string;
  "cognito:groups"?: string[];
  iss: string;
  version?: number;
  client_id?: string;
  token_use?: string;
  scope?: string;
  auth_time?: number;
  exp?: number;
  iat?: number;
  jti?: string;
  username?: string;
  at_hash?: string;
  email_verified?: boolean;
  cognito_username?: string;
  nonce?: string;
  aud?: string;
  identities?: {
    userId: string;
    providerName: string;
    providerType: string;
    issuer: string;
    primary: string;
    dateCreated: string;
  }[];
  email?: string;
};

type AuthToken = {
  payload: AuthPayload;
};

type AuthTokens = {
  accessToken: AuthToken;
  idToken: AuthToken;
};

type Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: string;
};
export type getAccountIds = {
  input: {
    accountId?: string;
    groupId?: string;
    status?: string;
  };
};

export type AuthResponseT = {
  tokens: AuthTokens;
  credentials: Credentials;
  identityId: string;
  userSub: string;
};
export type MetaDataT = {
  key: string;
  value: string;
};

export type ConfigValueT = string[] | { [key: string]: string }[];
export type ObjectItemI =
  | { key?: string; pair?: string }
  | {
      [key: string]: string | number | symbol | any;
    };
export type arrayOfObjectT = ObjectItemI[];

export type DefaultFormT = {
  title?: string;
  serviceDetail?: string;
  type: "arrayOfString" | "arrayOfObject";
  arrayOfString: string[];
  arrayOfObject: arrayOfObjectT;
  view?: boolean;
  slug?: string | number;
  id?: string | number;
};
export type CampaignDefaultFormT = {
  campaignId?: string;
  promoCode?: string;
  promoId?: string;
  description: string;
  title: string;
  enabled: boolean;
  exposed: boolean;
  requiresPromoCode: boolean;
  tags: boolean;
  metaTitle: string;
  metaShortTitle: string;
  metaSubTitle: string;
  metaDescription: string;
  metaBody: string;
  cta: string;
  metaPromoCode: string;
  bodySubTitle: string;
  bodyTitle: string;
  bodySortOrder: number;
  bodyUpgradeLevel: OptionsT[];
  accountOrderType: OptionsT[];
  qualifyingLevels: OptionsT[];
  minVials: number | null;
  maxVials: number | null;
  templateId: OptionsT[];
  terms: string;
  minUsePerAccount: number | null;
  maxUsePerAccount: number | null;
  pricingModel: OptionsT[];
  includeAccountIds: OptionsT[];
  excludeAccountIds: OptionsT[];
  includeGroupIds: OptionsT[];
  excludeGroupIds: OptionsT[];
  discountedAmountPerUnit: number;
  discountedPercentagePerUnit: number;
  discountedPricePerUnit: number;
  maxDiscountedQuantity: number;
  effectiveEvoluxLevel: OptionsT[];
  minSales: number;
  maxSales: number;
  salesStartDate: Date | null;
  salesEndDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
};

type ArrayOfStrings = {
  type: '"arrayOfString"';
  configValues: string[];
};

type ArrayOfObjects = {
  type?: "arrayOfObject";
  configValues: Record<string, string>[];
};

type ConfigInput = {
  serviceDetail: string;
  id?: string;
  title?: string;
} & (ArrayOfStrings | ArrayOfObjects);

export type ConfigVariables = {
  input: ConfigInput;
};

export type ConfigOperationT = {
  operationName: "updateConfig" | "createConfig";
  variables: ConfigVariables;
};
type User = {
  user: string;
};

export type StatusChange = {
  field: string;
  after: string | null;
  before: string | null;
};
type Feature = {
  id: string;
  name: string;
  status: string;
};
type DeactivateFeature = {
  feature: Feature;
  level: string;
};
export type UpdateFeatureRequest = {
  deactivateFeature: DeactivateFeature;
  activateFeature: DeactivateFeature;
};
export type FeatureModification = {
  featureModifiedAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
  changes: StatusChange[];
  user: string;
};
export type FeatureFlag = {
  AccountIds?: string[];
  includeArchived?: boolean;
  type?: string;
  isArchived?: boolean;
  globallyActivatedAt?: string | null;
  name?: string;
  entity?: string;
  featureName?: string;
  entityName?: string;
  entityId?: string;
  status?: "ACTIVE" | "INACTIVE";
  isRemoved?: boolean | null;
  ttl?: number;
  globalStatus?: "ACTIVE" | "INACTIVE";
  metadata?: string | Array<MetaDataT>;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: object;
  description?: string;
};

type IsFeatureEnabledResponse = {
  enabled: boolean;
};
export type isFeatureEnabledT = {
  isFeatureEnabled?: IsFeatureEnabledResponse;
};
export type FeatureFlagT = {
  getAllFeatures: {
    features: FeatureFlag[];
  };
};
export type GetFeatureOverridesT = {
  featureName?: string;
  overrides?: FeatureFlag[];
};
export type GetFeatureOverridesAccountT = {
  getFeatureOverrides: GetFeatureOverridesT;
};
export type FeatureFlagVariableT = {
  input: FeatureFlag;
};
export type FeatureFlagHistoryT = {
  featureName?: string;
  entityName?: string | null;
  entityId?: string | null;
  getFeatureHistory?: {
    history: FeatureModification[];
  };
};
type CreateFeatureResponse = {
  feature: FeatureFlag;
};
export type CreateFeatureFlagT = {
  createFeature: CreateFeatureResponse;
};

export type GetAllFeatureOverridesResponse = {
  status?: number;
  getAllFeatureOverrides?: {
    features: FeatureFlag[];
  };
};

type CreateFeatureOverrideResponse = {
  override: any[];
};
export type AccountSpecificFeatureOverrideResponse = {
  createFeatureOverride: CreateFeatureOverrideResponse;
};

export type gqlServerVariablesType = {
  serviceDetail: string;
  type: string;
  configValues: string[] | Record<string, string>[];
  id?: string;
  title?: string;
};

export type UserT = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};
export type CurrentUserT = {
  currentUser?: UserT | null;
};

export type ConfigResponse = {
  updateConfig?: {
    success: boolean;
  };
  createConfig?: {
    success: boolean;
  };
};

export type PromotResultResult<T> = {
  search: {
    from: number;
    total: number;
    hits: T[];
  };
};
export type CommonKeysT = {
  createdAt: string;
  campaignId: string;
  id: string;
  promoId: string;
};
export type Entity = CommonKeysT & {
  createdBy: Upadte_Create_Promotion;
  updatedAt: string;
  updatedBy: Upadte_Create_Promotion;
  promoCode: string;
  usedCount: number;
  voided: boolean;
  ttl: string | null;
};
export type getPromotionResponseT = {
  getPromotion: GetPromotionFormT;
};

export type CampaignSearchHits = CommonKeysT & {
  startDate: string;
  endDate: string;
  description: string;
  name: string;
  exposed: boolean;
  enabled: boolean;
  discountId: string;
  tags: Array<string>;
  title: string;
  CreatedBy: string | null;
  updatedAt: string | null;
  meta: JSON;
};
export type ActiveTemplateT<T> = {
  getActivePromotionTemplate: {
    templates: T;
  };
};
export type AccountPromotions = CommonKeysT & {
  accountId: string;
  voided: boolean;
  promoCode: string;
  consumerProfileId: string | null;
  consumerRewardId: string | null;
  orderId: string;
  promotionReward: string | null;
  __typename: string;
};

export type Result<T> = {
  id: string;
  score: number;
  entity: T;
};
export type EntityT = {
  id: string;
  name: string;
  status: string;
  firstName: string;
  lastName: string;
};
export type getAccountIdT = {
  getAllActiveAccountIds: Accounts;
  getAllActiveGroupIds: groupIds;
};
type Accounts = {
  accountIds: string[] | null;
};
type groupIds = {
  groupIds: string[] | null;
};
export type userAccountsT = {
  entityName: string;
  entityId: string;
  entity: EntityT;
};
export type ArchieveFeature = {
  feature: FeatureFlag;
};
export type GetOneCampaignResponse = {
  getCampaignByCampaignId: CampaignResponseT;
};
export type CampaignResponseT = {
  campaignId?: string;
  discountId?: string;
  promoId?: string;
  promoCode?: string;
  description?: string;
  enabled?: boolean;
  exposed?: boolean;
  requiresPromoCode?: boolean;
  meta?: {
    promoCode?: string;
    badge?: {
      title?: string;
      shortTitle?: string;
      subTitle?: string;
      description?: string;
    };
    upgradeToLevel?: string[] | string | null;
    body?: string;
    cta?: string;
    terms?: string;
    subTitle?: string;
    title?: string;
    sortOrder?: number | null;
  };
  title?: string;
  tags?: string[] | null;
  rules?: {
    accountOrderType?: string | null;
    highestEvoluxLevelInDateRange?: {
      qualifyingLevels?: string[] | null;
      startDate?: string | null;
      endDate?: string | null;
    };
    minVials?: number | null;
    maxVials?: number | null;
    maxUsePerCode?: number | null;
    maxUsePerAccount?: number | null;
    pricingModel?: string[] | null;
    includeAccountIds?: string[] | null;
    excludeAccountIds?: string[] | null;
    includeGroupIds?: string[] | null;
    excludeGroupIds?: string[] | null;
    standardDiscount?: {
      discountedAmountPerUnit?: number | null;
      discountedPercentagePerUnit?: number | null;
      discountedPricePerUnit?: number | null;
      maxDiscountedQuantity?: number | null;
    };
    effectiveEvoluxLevel?: string[];
    salesInRange?: {
      minSales?: number | null;
      maxSales?: number | null;
      startDate?: string | null;
      endDate?: string | null;
    };
  };
  templateId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type EditFeatureFlagT = {
  getFeature?: {
    feature: FeatureFlag | undefined;
  };
  getFeatureOverride?: {
    feature: FeatureFlag | undefined;
  };
};
type BasePromotionFormT = {
  promoId?: string;
  promoCode?: string;
  ttl?: number | null;
  usedCountAdjustment?: number;
  voided?: boolean;
  usedCount?: number;
};

export type AddPromotionFormT = BasePromotionFormT & {
  campaignId: OptionsT[];
};

export type GetPromotionFormT = BasePromotionFormT & {
  campaignId: string;
};
export type InputPayloadT = {
  campaignId?: string;
  promoCode?: string;
  voided?: boolean;
  ttl?: number | null;
  promoId?: string | number;
  usedCount?: number;
};
type CreatePromotionResponse = {
  success: boolean;
  message: string;
};
export type PromotionUpdateT = {
  createPromotion: CreatePromotionResponse;
  updatePromotion: AddPromotionFormT;
};
export type AddPromotionInputT = {
  input: AddPromotionFormT;
};

export type EditResponseAccountSpecific = {
  upsertFeatureOverride?: {
    override?: FeatureFlag;
  };
};
export type CommonResponse<T> = {
  upsertFeatureOverride?: {
    override: FeatureFlag;
  };
  archiveFeature?: ArchieveFeature;
  search: {
    from: number;
    total: number;
    hits: T[];
  };
};

export type Upadte_Create_Promotion = {
  service: string;
  serviceDetail: string;
};
export type ConfigFormInput = {
  serviceDetail: string | undefined;
  type: string | undefined;
  configValues: any;
  id?: string;
  title?: string;
};
export type ConfigFormInputT = {
  input: ConfigFormInput;
};
// Define the type for the Filter object
export type Filter = {
  field: string;
  equals?: string;
  equalsBoolean?: boolean;
  range?: {
    gte?: string;
    lte?: string;
  };
};
export type SortT = {
  field: string;
  direction: string;
};

export type PromoVariableT = {
  input: {
    entity: string;
    filters: Filter[];
    q: {
      text: string;
      fields: string[];
    };
    sort?: SortT[];
    size: number;
    from: number;
  };
};

export type UserAccountVariableType = {
  input: {
    entity: string;
    filters: Filter[];
    q: {
      text: string;
      fields: string[];
    };
    size: number;
    from: number;
  };
};

type UserAccount = {
  accountId: string;
  accountRoleId: string;
  role: string;
  primaryJob: string | null;
  status: string;
  facilities: string | null;
};

type UserListTypes = {
  id: string;
  email: string;
  userType: string;
  roleId: string | null;
  firstName: string;
  lastName: string;
  accounts: UserAccount[];
};

export type UserEntity = {
  entity: UserListTypes;
};
