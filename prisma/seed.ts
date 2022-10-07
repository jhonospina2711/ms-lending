import { PrismaClient } from '@prisma/client';

const run = async () => {
  const prisma = new PrismaClient();
  try {
    if ((await prisma.documentType.count()) === 0) {
      await prisma.documentType.create({
        data: {
          type: 'C.C.',
          name: 'Cedula de ciudadania',
        },
      });
      await prisma.documentType.create({
        data: {
          type: 'C.E.',
          name: 'Cedula de extranjeria',
        },
      });
      await prisma.documentType.create({
        data: {
          type: 'P.E.',
          name: 'Pasaporte',
        },
      });
    } else {
      console.log('Default documentType already created');
    }
    if ((await prisma.user.count()) === 0) {
      await prisma.user.create({
        data: {
          documentTypeId: 1,
          document: '1130595250',
          name: 'Jhon Gabriel',
          last_name: 'Ospina Orozco',
          email: 'jhonospina2711@gmail.com',
          cel_phone: '3185839956',
          birth_date: new Date('1987-07-11'),
        },
      });
    } else {
      console.log('Default User already created');
    }
    if ((await prisma.target.count()) === 0) {
      await prisma.target.create({
        data: {
          name: 'NEW',
          min_cant: 0,
          max_cant: 2,
          min_amount_total: null,
          max_amount_total: 100000,
          rate: 0.15,
          max: 500000,
        },
      });

      await prisma.target.create({
        data: {
          name: 'FREQUENT',
          min_cant: 0,
          max_cant: 5,
          min_amount_total: 100000,
          max_amount_total: 500000,
          rate: 0.1,
          max: 1000000,
        },
      });
      await prisma.target.create({
        data: {
          name: 'PREMIUM',
          min_cant: 5,
          max_cant: null,
          min_amount_total: 500000,
          max_amount_total: null,
          rate: 0.05,
          max: 5000000,
        },
      });
    } else {
      console.log('Default target already created');
    }
    if ((await prisma.loan.count()) === 0) {
      await prisma.loan.create({
        data: {
          user_id: 1,
          amount: 100000,
          term: 12,
          date: new Date('2020-09-29 21:36:49'),
          installment: 9025.83,
          target_id: 1,
          rate: 0.15,
        },
      });
    } else {
      console.log('Default loan already created');
    }
    if ((await prisma.payment.count()) === 0) {
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 90974.17,
          date: new Date('2020-10-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 81948.34,
          date: new Date('2020-11-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 72922.51,
          date: new Date('2020-12-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 63896.68,
          date: new Date('2021-01-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 54870.84,
          date: new Date('2021-02-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 45845.01,
          date: new Date('2021-03-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 36819.18,
          date: new Date('2021-04-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 27793.35,
          date: new Date('2021-05-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 18767.52,
          date: new Date('2021-06-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 9741.69,
          date: new Date('2021-07-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 715.86,
          date: new Date('2021-08-29 21:36:49'),
          installment: 9025.83,
        },
      });
      await prisma.payment.create({
        data: {
          loan_id: 1,
          amount: 9025.83,
          debt: 0,
          date: new Date('2021-09-29 21:36:49'),
          installment: 9025.83,
        },
      });
    } else {
      console.log('Default payment already created');
    }
  } finally {
    await prisma.$disconnect();
  }
};

run();
