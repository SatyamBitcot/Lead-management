import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    
    
    this.supabase = createClient("https://unzxwwgyqhtuhvgrsigb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuenh3d2d5cWh0dWh2Z3JzaWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjI2MDUsImV4cCI6MjA1OTM5ODYwNX0.x4swRiQb4PS3iSBQN0k9HpCI94sgZzha1zzx943S2lE");
    console.log('Supabase URL:-------------'); 
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}

