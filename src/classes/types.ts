// This is used to define the custom Types for TS.

// NewsAPI entry type
export type NewsEntry = {
  date: string;
  type: string;
  status: string;
  message: string;
};

// GuidesAPI entry type
export type GuideEntry = {
  name: string;
  url: string;
};

// LinksAPI entry type
export type LinkEntry = {
  name: string;
  url: string;
  icon: string;
};

// Plans entry type
export type PlansEntry = {
  status: string;
  name: string;
  url: string;
  planId: string;
  accountLimit: string;
  projectLimit: string;
  proxyLimit: string;
  slaveLimit: string;
}