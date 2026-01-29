import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS এনাবল করা থাকলে ফ্রন্টএন্ড থেকে রিকোয়েস্ট পাঠাতে সুবিধা হবে
  app.enableCors();

  // Render-এর জন্য পোর্ট এবং হোস্ট কনফিগারেশন
  // Render অটোমেটিক একটি পোর্ট অ্যাসাইন করে, তাই process.env.PORT ব্যবহার করা জরুরি
  const port = process.env.PORT || 10000;
  
  // '0.0.0.0' হোস্ট দেওয়া হয়েছে যাতে বাইরের নেটওয়ার্ক থেকে অ্যাপটি কানেক্ট হতে পারে
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on port: ${port}`);
}
bootstrap();