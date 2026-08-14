export type TimestampLike = string | Date | { seconds: number; nanoseconds: number };
export type ContentStatus = "DRAFT" | "PUBLISHED" | "UNPUBLISHED" | "ARCHIVED";
export type ApplicationMode = "ONLINE" | "OFFLINE" | "BOTH";
export type AdminRole = "SUPER_ADMIN" | "EDITOR" | "CONTENT_MANAGER" | "VIEWER";
export type Permission = "jobs:read" | "jobs:create" | "jobs:update" | "jobs:publish" | "jobs:unpublish" | "jobs:archive" | "admin:manage";

export interface VacancyDetail { postName: string; total?: number; ur?: number; obc?: number; sc?: number; st?: number; ews?: number; other?: string; }
export interface Qualification { summary?: string; details?: string; }
export interface AgeLimit { minimum?: number; maximum?: number; calculationDate?: string; relaxation?: string; relaxations?: AgeRelaxation[]; }
export interface AgeRelaxation { category: string; relaxation: string; description?: string; }
export interface FeeRow { category: string; amount: number; description?: string; }
export interface ApplicationFee { rows?: FeeRow[]; paymentMode?: string; refundInfo?: string; }
export interface ImportantDates { applicationStart?: string; applicationLast?: string; feePaymentLast?: string; correctionLast?: string; examDate?: string; admitCardDate?: string; resultDate?: string; datesNotAnnounced?: string[]; }
export interface SelectionStage { order: number; title: string; description?: string; }
export interface ExamPatternRow { subject: string; questions?: number; marks?: number; duration?: string; negativeMarking?: string; }
export interface SyllabusTopic { title: string; subtopics?: string[]; }
export interface SyllabusSection { subject: string; topics: SyllabusTopic[]; }
export interface RequiredDocument { name: string; description?: string; required: boolean; }
export type OfficialLinkType = "APPLY_ONLINE" | "OFFICIAL_NOTIFICATION" | "OFFICIAL_WEBSITE" | "ADMIT_CARD" | "RESULT" | "ANSWER_KEY" | "CORRECTION" | "OTHER";
export interface OfficialLink { label: string; url: string; type: OfficialLinkType; active: boolean; verifiedOfficial?: boolean; }

export interface Job {
  id: string;
  title: string;
  slug: string;
  organizationId: string;
  organizationName?: string;
  categoryId: string;
  categoryName?: string;
  stateIds: string[];
  stateNames?: string[];
  description: string;
  recruitmentType?: string;
  advertisementNumber?: string;
  postNames: string[];
  vacancy?: number;
  vacancyDetails?: VacancyDetail[];
  qualification?: Qualification;
  ageLimit?: AgeLimit;
  ageRelaxation?: string;
  applicationFee?: ApplicationFee;
  importantDates?: ImportantDates;
  selectionProcess?: SelectionStage[];
  examPattern?: ExamPatternRow[];
  syllabus?: SyllabusSection[];
  documentsRequired?: RequiredDocument[];
  howToApply?: Array<{ order: number; instruction: string }>;
  officialLinks?: OfficialLink[];
  jobLocation?: string;
  applicationMode?: ApplicationMode;
  status: ContentStatus;
  published: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: TimestampLike;
  updatedAt: TimestampLike;
  publishedAt?: TimestampLike;
  archivedAt?: TimestampLike;
  createdBy: string;
  updatedBy: string;
}

export interface Exam { id: string; title: string; slug: string; organizationId: string; status: string; published: boolean; createdAt: TimestampLike; updatedAt: TimestampLike; }
export interface Result { id: string; title: string; slug: string; organizationId: string; resultDate?: string; status: string; officialLink?: OfficialLink; published: boolean; }
export interface AdmitCard { id: string; title: string; slug: string; organizationId: string; examDate?: string; releaseDate?: string; status: string; officialLink?: OfficialLink; published: boolean; }
export interface AnswerKey { id: string; title: string; slug: string; organizationId: string; answerKeyDate?: string; paper?: string; objectionStart?: string; objectionEnd?: string; officialLink?: OfficialLink; published: boolean; }
export interface University { id: string; name: string; slug: string; stateId?: string; city?: string; type: "GOVERNMENT" | "PRIVATE"; website?: string; courses?: string[]; published: boolean; }
export interface Organization { id: string; name: string; slug: string; type?: string; website?: string; published: boolean; }
export interface Category { id: string; name: string; slug: string; description?: string; published: boolean; }
export interface State { id: string; name: string; slug: string; type: "STATE" | "UNION_TERRITORY" | "CENTRAL"; published: boolean; }
export interface AdminUser { id: string; uid: string; email: string; displayName?: string; role: AdminRole; active: boolean; createdAt: TimestampLike; updatedAt: TimestampLike; }
export interface AuditLog { id: string; adminId: string; action: "LOGIN" | "LOGOUT" | "JOB_CREATED" | "JOB_UPDATED" | "JOB_PUBLISHED" | "JOB_UNPUBLISHED" | "JOB_ARCHIVED"; entityType: "AUTH" | "JOB"; entityId: string; timestamp: TimestampLike; metadata?: Record<string, string | number | boolean | null>; }
