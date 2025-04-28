import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
          email: 'elsa@prisma.io',
          name: 'Elsa Prisma',
        },
    });
        

console.log(user);
}
      main()



/*import prisma from '@prisma/client';
//const prisma=new prisma();
export async function getStaticProps() {
const users = await prisma.user.create({
    data:{
        email:'email@email.com',
        name:'john',
    },
});
return { props: { users } };
}

getStaticProps()*/
