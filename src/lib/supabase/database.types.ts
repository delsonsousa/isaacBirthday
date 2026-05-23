export type Rsvp = {
  id: string;
  name: string;
  phone: string;
  will_attend: boolean;
  adults: number;
  children: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: Rsvp;
        Insert: {
          id?: string;
          name: string;
          phone: string;
          will_attend: boolean;
          adults?: number;
          children?: number;
          created_at?: string;
        };
        Update: Partial<Omit<Rsvp, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
