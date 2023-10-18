export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      "anvers ": {
        Row: {
          created_at: string;
          id: number;
          is_correct: boolean;
          question_id: number;
          text: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_correct?: boolean;
          question_id: number;
          text: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_correct?: boolean;
          question_id?: number;
          text?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "anvers _question_id_fkey";
            columns: ["question_id"];
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };
      modules: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_published: boolean;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_published?: boolean;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_published?: boolean;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          created_at: string;
          id: number;
          module_id: number;
          text: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          module_id: number;
          text?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          module_id?: number;
          text?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_module_id_fkey";
            columns: ["module_id"];
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      scores: {
        Row: {
          created_at: string;
          id: number;
          module_id: number;
          score: number;
          updated_at: string;
          user_name: string;
        };
        Insert: {
          created_at: string;
          id?: number;
          module_id: number;
          score?: number;
          updated_at: string;
          user_name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          module_id?: number;
          score?: number;
          updated_at?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scores_module_id_fkey";
            columns: ["module_id"];
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
