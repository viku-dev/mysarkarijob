export type TimestampLike = string | Date | { seconds: number; nanoseconds: number };

export type WorkflowStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "UNPUBLISHED" | "ARCHIVED";
export type JobStatus = "UPCOMING" | "APPLICATION_OPEN" | "APPLICATION_CLOSED" | "EXAM_SCHEDULED" | "ADMIT_CARD_RELEASED" | "RESULT_RELEASED" | "COMPLETED" | "CANCELLED" | "POSTPONED";
export type ApplicationMode = "ONLINE" | "OFFLINE" | "BOTH";

export interface VacancyDetail { postName: string; total?: number; ur?: number; obc?: number; sc?: number; st?: number; ews?: number; other?: string; }
export interface Qualification { summary?: string; details?: string; }
export interface AgeLimit { minimum?: number; maximum?: number; calculationDate?: string; relaxation?: string; }
export interface ApplicationFee { general?: string; obc?: string; ews?: string; sc?: string; st?: string; female?: string; pwd?: string; other?: string; paymentMode?: string; refundInfo?: string; }
export interface ImportantDates { applicationStart?: string; applicationLast?: string; feePaymentLast?: string; correctionLast?: string; examDate?: string; admitCardDate?: string; resultDate?: string; }
export interface SelectionStage { order: number; title: string; description?: string; }
export interface ExamPatternRow { subject: string; questions?: number; marks?: number; duration?: string; negativeMarking?: string; examMode?: string; }
export interface SyllabusSection { subject: string; topics: Array<{ title: string; subtopics?: string[] }>; }
export type OfficialLinkType = "APPLY_ONLINE" | "OFFICIAL_NOTIFICATION" | "OFFICIAL_WEBSITE" | "ADMIT_CARD" | "RESULT" | "ANSWER_KEY" | "CORRECTION" | "OTHER";
export interface OfficialLink { label: string; url: string; type: OfficialLinkType; active: boolean; }

export interface Job {
  id: string; title: string; slug: string; organizationId: string; categoryId: string; stateIds: string[]; description?: string; advertisementNumber?: string; postNames: string[]; vacancy?: number; vacancyDetails?: VacancyDetail[]; qualification?: Qualification; ageLimit?: AgeLimit; ageRelaxation?: string; applicationFee?: ApplicationFee; importantDates?: ImportantDates; selectionProcess?: SelectionStage[]; examPattern?: ExamPatternRow[]; syllabus?: SyllabusSection[]; documentsRequired?: string[]; howToApply?: Array<{ order: number; instruction: string }>; officialLinks?: OfficialLink[]; jobLocation?: string; applicationMode?: ApplicationMode; status: JobStatus; workflowStatus: WorkflowStatus; published: boolean; featured: boolean; seoTitle?: string; seoDescription?: string; createdAt: TimestampLike; updatedAt: TimestampLike; createdBy: string; updatedBy: string;
}

export interface Exam { id: string; title: string; slug: string; organizationId: string; status: string; published: boolean; createdAt: TimestampLike; updatedAt: TimestampLike; }
export interface Result { id: string; title: string; slug: string; organizationId: string; resultDate?: string; status: string; officialLink?: OfficialLink; published: boolean; }
export interface AdmitCard { id: string; title: string; slug: string; organizationId: string; examDate?: string; releaseDate?: string; status: string; officialLink?: OfficialLink; published: boolean; }
export interface AnswerKey { id: string; title: string; slug: string; organizationId: string; answerKeyDate?: string; paper?: string; objectionStart?: string; objectionEnd?: string; officialLink?: OfficialLink; published: boolean; }
export interface University { id: string; name: string; slug: string; stateId?: string; city?: string; type: "GOVERNMENT" | "PRIVATE"; website?: string; courses?: string[]; published: boolean; }
export interface Organization { id: string; name: string; slug: string; type?: string; website?: string; published: boolean; }
export interface Category { id: string; name: string; slug: string; description?: string; published: boolean; }
export interface State { id: string; name: string; slug: string; type: "STATE" | "UNION_TERRITORY" | "CENTRAL"; published: boolean; }
export type AdminRole = "SUPER_ADMIN" | "EDITOR" | "CONTENT_MANAGER" | "VIEWER";
export interface AdminUser { id: string; uid: string; email: string; displayName?: string; role: AdminRole; active: boolean; createdAt: TimestampLike; updatedAt: TimestampLike; }
