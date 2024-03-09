export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
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
            foreignKeyName: "answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
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
          min_questions: number;
          name: string;
          quiz_question_amount: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_published?: boolean;
          min_questions?: number;
          name: string;
          quiz_question_amount?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_published?: boolean;
          min_questions?: number;
          name?: string;
          quiz_question_amount?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          created_at: string;
          id: number;
          module_id: number;
          text: string;
          time_to_answer: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          module_id: number;
          text: string;
          time_to_answer?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          module_id?: number;
          text?: string;
          time_to_answer?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      scores: {
        Row: {
          created_at: string;
          guild_id: string;
          id: number;
          module_id: number;
          score: number;
          updated_at: string;
          user_name: string;
        };
        Insert: {
          created_at?: string;
          guild_id: string;
          id?: number;
          module_id: number;
          score: number;
          updated_at?: string;
          user_name: string;
        };
        Update: {
          created_at?: string;
          guild_id?: string;
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
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      top_scores: {
        Row: {
          created_at: string | null;
          guild_id: string | null;
          id: number | null;
          module_id: number | null;
          rnum: number | null;
          score: number | null;
          updated_at: string | null;
          user_name: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scores_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
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
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
