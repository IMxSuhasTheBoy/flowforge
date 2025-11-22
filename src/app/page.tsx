import prisma from "@/lib/db";

const Page = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="text-3xl h-full min-h-screen min-w-screen flex items-center justify-center">
      FlowForge Studio
      {JSON.stringify(users)}
    </div>
  );
};

export default Page;
