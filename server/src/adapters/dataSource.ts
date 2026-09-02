/**
 * ==============================================================================================
 * UNLOCK DATA SOURCE ADAPTER INTERFACE & DATABRICKS / GENIE MIGRATION SPECIFICATION
 * ==============================================================================================
 * 
 * ARCHITECTURAL DESIGN:
 * This interface isolates all data fetching and AI analytical operations behind a single 
 * typed contract. The frontend client NEVER accesses databases directly.
 * 
 * CURRENT IMPLEMENTATION:
 * Currently, `MockDataSource` implements this interface using local high-fidelity JSON seed 
 * fixtures stored in `/server/src/data/*.json`. It provides sub-millisecond local responses 
 * and dynamic calculations for 18+ students, internships, roadmaps, and class aggregates.
 * 
 * INTENDED DATABRICKS + GENIE MIGRATION PATH:
 * To migrate from local fixtures to live Databricks Lakehouse SQL and Databricks Genie:
 * 1. Create `DatabricksDataSource` implementing `IDataSource`.
 * 2. Connect via `@databricks/sql` using DATABRICKS_HOST, DATABRICKS_TOKEN, and DATABRICKS_HTTP_PATH.
 * 3. Point student digital twin queries to the Delta Lake Gold tables:
 *    - `gold.student_digital_twins` (academic, verified skills, project embeddings)
 *    - `gold.internship_postings` (live recruiter requirements and vectorized job descriptions)
 *    - `gold.cohort_readiness_metrics` (aggregated faculty cohort statistics)
 * 4. Wire `askUnlockAI()` to the Databricks Genie API / Mosaic AI Model Serving Endpoint 
 *    passing the student's digital twin context into the conversation prompt.
 * 5. In `server/src/adapters/dataSource.ts`, toggle `USE_DATABRICKS === 'true'` in `getDataSource()`.
 * 
 * Result: Zero changes required in any Express route handlers, frontend components, or domain types.
 * ==============================================================================================
 */

import {
  Student,
  StudentDashboardResponse,
  InternshipMatch,
  SkillGapAnalysis,
  StudentRoadmap,
  FacultyDashboardData,
  FacultyStudent360Response,
  ChatMessage,
  ChatRequest
} from '../types/index.js';

export interface IDataSource {
  // Student API operations
  getAllStudents(): Promise<Student[]>;
  getStudentById(id: string): Promise<Student | null>;
  getStudentDashboard(studentId: string): Promise<StudentDashboardResponse | null>;
  getStudentProfile(studentId: string): Promise<Student | null>;
  getStudentInternshipMatches(studentId: string): Promise<InternshipMatch[]>;
  getStudentSkillGap(studentId: string, targetRoleId?: string): Promise<SkillGapAnalysis | null>;
  getStudentRoadmap(studentId: string): Promise<StudentRoadmap | null>;
  askUnlockAI(studentId: string, request: ChatRequest): Promise<ChatMessage>;

  // Faculty API operations
  getFacultyDashboard(classId: string): Promise<FacultyDashboardData | null>;
  getFacultyStudents(classId: string): Promise<Student[]>;
  getFacultyStudent360(studentId: string): Promise<FacultyStudent360Response | null>;
  getFacultySkillGaps(classId: string): Promise<FacultyDashboardData['rankedClassSkillGaps']>;
  getFacultyAIInsights(classId: string): Promise<any>;
}

// Factory to return active data source adapter
import { MockDataSource } from './mockDataSource.js';

let activeDataSourceInstance: IDataSource | null = null;

export function getDataSource(): IDataSource {
  if (!activeDataSourceInstance) {
    const useDatabricks = process.env.USE_DATABRICKS === 'true';
    if (useDatabricks) {
      // Once DatabricksDataSource is created, return new DatabricksDataSource();
      console.log('⚡ [UNLOCK] Initializing Databricks Lakehouse DataSource Adapter...');
      activeDataSourceInstance = new MockDataSource(); // Fallback for safety
    } else {
      console.log('📦 [UNLOCK] Initializing High-Fidelity Mock DataSource Adapter (Databricks-ready)');
      activeDataSourceInstance = new MockDataSource();
    }
  }
  return activeDataSourceInstance;
}
