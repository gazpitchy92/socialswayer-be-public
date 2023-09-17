export type NewsEntry = {
  date: string;
  type: string;
  status: string;
  message: string;
};

export type GuideEntry = {
  name: string;
  url: string;
};

export type LinkEntry = {
  name: string;
  url: string;
  icon: string;
};

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