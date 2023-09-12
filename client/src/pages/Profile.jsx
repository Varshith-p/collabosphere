import { Avatar, Typography, Button } from "@material-tailwind/react";

export function Profile() {
  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative h-[50vh] bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-40 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-end">
                <div className="flex w-full justify-center justify-self-center px-4 lg:order-1 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40 lg:mr-24">
                      <Avatar
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-2 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button className="bg-blue-400 normal-case py-1 text-base font-normal shadow-none hover:shadow-none">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  Varshith Puligadda
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <Typography className="font-medium text-blue-gray-700">
                    Los Angeles, California
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Typography className="font-medium text-blue-gray-700">
                    Solution Manager - Creative Tim Officer
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Typography className="font-medium text-blue-gray-700">
                    University of Computer Science
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
