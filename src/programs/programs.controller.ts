import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/api')
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get('programs')
  async getPrograms() {
    try {
      // 🚨 TEMPORARY: Return empty until database tables exist
      return { data: [], count: 0 };
    } catch (error) {
      console.error('ProgramsController ERROR:', error.message);
      return { data: [], count: 0, error: 'Database sync required' };
    }
  }

  @Post('programs')
  async createProgram(@Body() createProgramDto: any) {
    try {
      // 🚨 TEMPORARY: Return success without DB write
      return { 
        data: { 
          id: 'temp-123', 
          title: createProgramDto.title,
          status: 'DRAFT' 
        }, 
        message: 'Program created successfully (demo mode)' 
      };
    } catch (error) {
      console.error('Create program error:', error);
      throw new HttpException('Failed to create program', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

      const program = await this.prisma.program.create({
        data: {
          title: createProgramDto.title,
          description: createProgramDto.description,
          languagePrimary: createProgramDto.languagePrimary,  // ✅ FIXED: camelCase
          languagesAvailable: createProgramDto.languagesAvailable || [createProgramDto.languagePrimary],  // ✅ FIXED
          status: 'DRAFT'
        }
      });
      return { data: program, message: 'Program created successfully' };
    } catch (error) {
      console.error('Create program error:', error);
      throw new HttpException('Failed to create program', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}






