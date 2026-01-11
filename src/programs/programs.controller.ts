@Controller('api/api/api')  // ← FIXED PATH!
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get('programs')
  async getPrograms() {
    console.log('🚀 ProgramsController.getPrograms() CALLED');  // ← DEBUG
    
    try {
      console.log('🔍 Querying Prisma program.findMany...');  // ← DEBUG
      const programs = await this.prisma.program.findMany({
        include: {
          terms: {
            include: {
              lessons: true
            }
          }
        }
      });
      
      console.log('✅ Programs found:', programs.length);  // ← DEBUG
      console.log('📊 Sample program:', programs[0] || 'EMPTY');  // ← DEBUG
      
      return { data: programs, count: programs.length };
    } catch (error) {
      console.error('💥 ProgramsController ERROR:', error);  // ← CRITICAL!
      return { data: [], count: 0, error: error.message };
    }
  }

  @Post('programs')
  async createProgram(@Body() dto: any) {
    console.log('➕ createProgram called:', dto.title);  // ← DEBUG
    // ... rest unchanged
  }
}
