// types.ts
export type DocumentItem = {
  _id: string;
  title: string;
  subtitle?: string;
  file: {
    asset: {
      url: string;
      _id: string;
    };
  };
  category: {
    _ref: string;
    _type: string;
  };
  fileSize?: number;
  fileType?: string;
  version?: string;
  accessLevel?: string;
  author?: string;
  uploadedBy?: string;
  publishedAt?: string;
  lastUpdated?: string;
  expiresAt?: string;
};

export type DocumentUpload = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  documents: DocumentItem[];
  status?: string;
  featured?: boolean;
  tags?: string[];
  seo?: any;
  internalNotes?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  documents: DocumentUpload[];
  totalDocuments: number;
};
