
// Entry name space for these types
namespace entry {

  // NewsAPI entry type
  export type news = {
    date: Date;
    type: string;
    status: string;
    message: string;
  };

  // GuidesAPI entry type
  export type guide = {
    name: string;
    url: string;
  };

  // LinksAPI entry type
  export type link = {
    name: string;
    url: string;
    icon: string;
  };

  // Plans entry type
  export type plan = {
    status: string;
    name: string;
    url: string;
    planId: number;
    accountLimit: number;
    projectLimit: number;
    proxyLimit: number;
    slaveLimit: number;
  };

}

export default entry;