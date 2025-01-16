import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/components/input-label";
import TextInput from "@/components/text-input";
import InputError from "@/components/input-error";
import {FormEventHandler} from "react";
import PrimaryButton from "@/components/primary-button";
import {User} from "@/types";
import SecondaryButton from "@/components/secondary-button";

export default function Edit({user}: { user: User }) {
  const {
    data,
    setData,
    processing,
    errors,
    put
  } = useForm({
    username: user.username,
    name: user.name,
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,

  })

  const updateUser: FormEventHandler = (ev) => {
    ev.preventDefault();
    put(route('user.update', user.id),
      {
        preserveScroll: true
      })
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {'Update User ' + user.name}
        </h2>
      }
    >
      <Head title={"Update User " + user.name}/>

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-8">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8 justify-around">
          <form onSubmit={updateUser}>
            <div className="w-fit flex items-center gap-4 justify-items-center">
              <div className="w-1/4">
                <InputLabel htmlFor="username" value="Username"/>

                <TextInput
                  id="username"
                  className="mt-1 block w-full"
                  value={data.username}
                  autoComplete="username"
                />

                <InputError className="mt-2" message={errors.username}/>
              </div>

              <div className="flex-1">
                <InputLabel htmlFor="name" value="Name"/>

                <TextInput
                  id="name"
                  className="mt-1 block w-full"
                  value={data.name}
                  onChange={(e:any) => setData('name', e.target.value)}
                  required
                  isFocused
                  autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name}/>
              </div>

              <div className="flex-1">
                <InputLabel htmlFor="email" value="Email"/>

                <TextInput
                  id="email"
                  className="mt-1 block w-full"
                  value={data.email}
                  onChange={(e:any) => setData('email', e.target.value)}
                  required
                  isFocused
                  autoComplete="email"
                />

                <InputError className="mt-2" message={errors.email}/>
              </div>

              <div className="flex-1">
                <InputLabel htmlFor="permissions" value="Permissions"/>

                <TextInput
                  id="permissions"
                  className="mt-1 block w-full"
                  value={data.permissions}
                  onChange={(e:any) => setData('permissions', e.target.value)}
                  required
                  isFocused
                  autoComplete="permissions"
                />

                <InputError className="mt-2" message={errors.permissions}/>
              </div>

              <div className="flex-1">
                <InputLabel htmlFor="roles" value="Roles"/>

                <TextInput
                  id="roles"
                  className="mt-1 block w-full"
                  value={data.roles}
                  onChange={(e:any) => setData('roles', e.target.value)}
                  required
                  isFocused
                  autoComplete="roles"
                />

                <InputError className="mt-2" message={errors.roles}/>
              </div>
            </div>
            <div className="block mx-auto space-x-4 mt-8 text-center">
              <SecondaryButton>
                <Link href={route('user.index')}>
                  Cancel
                </Link>
              </SecondaryButton>
              <PrimaryButton disabled={processing}>Update</PrimaryButton>
            </div>
          </form>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
