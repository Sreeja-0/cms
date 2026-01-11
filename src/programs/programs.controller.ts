import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/api')  // ✅ FIXED: Match your working routes
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get('programs')
async getPrograms() {
  try {
    // TEMP: Simple version until migrations run
    const programs = await this.prisma.program.findMany();
    return { data: programs, count: programs.length };
  } catch (error) {
    console.error('ProgramsController error:', error);
    throw new HttpException('Failed to fetch programs', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  }

  @Post('programs')
  async createProgram(@Body() createProgramDto: any) {
    try {
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



