import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/components/input-label";
import TextInput from "@/components/text-input";
import InputError from "@/components/input-error";
import {FormEventHandler} from "react";
import PrimaryButton from "@/components/primary-button";
import {Role, User} from "@/types";
import SecondaryButton from "@/components/secondary-button";
import Checkbox from "@/components/checkbox";
import RadioButton from "@/components/radio-button";

export default function Edit({roles, permissions, user, roleLabels, permissionLabels}: { roles: any, permissions: any, user: User, roleLabels: Record<string, string>, permissionLabels: Record<string, string> }) {
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

  const onRoleChange = (ev: any) => {
    console.log(ev.target.value, ev.target.checked);
    if(ev.target.checked) {
      setData('roles',  [ev.target.value] );
    }
  }
  const onPermissionChange = (ev: any) => {
    console.log(ev.target.value, ev.target.checked);
    if(ev.target.checked) {
      setData('permissions', [...data.permissions, ev.target.value] );
    } else {
      setData('permissions', [...data.permissions.filter(r => r != ev.target.value)]);
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {'Update User: ' + user.name}
        </h2>
      }
    >
      <Head title={"Update User: " + user.name}/>

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-8">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8 justify-around">
          <form onSubmit={updateUser}>
            <div className="w-fit items-center space-y-4 justify-items-center">
              <div className="w-1/4">
                <InputLabel htmlFor="username" value="Username"/>

                <TextInput
                  id="username"
                  className="mt-1 block w-full"
                  value={data.username}
                  onChange={(e:any) => setData('username', e.target.value)}
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
              <pre>{JSON.stringify(data, undefined, 2)}</pre>
                <InputLabel htmlFor="roles" value="Roles"/>

                {roles.map((role: any) => (
                  <div key={role.id}>
                  <RadioButton
                    name="roles"
                    checked={data.roles.includes(role.name)}
                    value={role.name}
                    onChange={onRoleChange}
                  />
                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{roleLabels[role.name]}</span>
                  </div>
                ))}


                <InputError className="mt-2" message={errors.roles}/>
              </div>

              <div className="flex-1">
                <InputLabel htmlFor="permissions" value="Permissions"/>

                {permissions.map((permission: any) => (
                  <div key={permission.id}>
                    <Checkbox
                      name="permissions"
                      checked={data.permissions.includes(permission.name)}
                      value={permission.name}
                      onChange={onPermissionChange}
                    />
                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{permissionLabels[permission.name]}</span>
                  </div>
                ))}
                <InputError className="mt-2" message={errors.permissions}/>
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
