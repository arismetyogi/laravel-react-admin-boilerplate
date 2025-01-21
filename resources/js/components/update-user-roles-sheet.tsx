import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {useForm, usePage} from "@inertiajs/react";
import {DialogProps} from "@radix-ui/react-dialog";
import InputError from "@/components/input-error";
import TextInput from "@/components/text-input";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {toast} from "react-hot-toast";
import InputLabel from "@/components/input-label";
import {User} from "@/types";
import {Avatar, AvatarFallback} from "@radix-ui/react-avatar";
import {getAvatar} from "@/lib/utils";
import {AvatarImage} from "@/components/ui/avatar";
import {ucwords} from "@/helper";
import RadioButton from "@/components/radio-button";


type Props = DialogProps & {
  selected: User,
  roles: string[],
  roleLabels: Record<string, string>,
}

const UpdateUserRoleSheet = ({onOpenChange, selected, roles, roleLabels, ...props}: Props) => {

  const {data, setData, post, errors, reset, processing} = useForm({
    roles: selected.roles,
    name: selected.name,
    email: selected.email,
  });


  const onRoleChange = (ev: any) => {
    console.log(ev.target.value, ev.target.checked);
    if(ev.target.checked) {
      setData('roles', [...data.roles, ev.target.value] );
    } else {
      setData('roles', [...data.roles.filter(r => r != ev.target.value)]);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    post(route('users.update-role', selected.id),
      {
        onSuccess: () => {
          toast.success(`${selected.name}'s role have been updated successfully.`);
          reset();
          onOpenChange?.(false); //Close sheet on success
        },
      });
  };

  return <Sheet onOpenChange={onOpenChange} {...props}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Role for User: {ucwords(selected.name)}</SheetTitle>
        <SheetDescription/>
      </SheetHeader>

      <Avatar>
        <div
          className="w-24 h-24 items-center mx-auto bg-slate-100 text-center content-center overflow-hidden bg-clip-content rounded-full mt-5 text-4xl">
          <AvatarImage src={selected.avatar}/>
          <AvatarFallback>{getAvatar(selected.name)}</AvatarFallback>
        </div>
      </Avatar>

      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="space-y1 col-span-full">
          <InputLabel>Full Name</InputLabel>
          <TextInput
            value={data.name}
            disabled
          />
          <InputError message={errors.name}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Email</InputLabel>
          <TextInput
            value={data.email}
            disabled
          />
          <InputError message={errors.email}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Role</InputLabel>
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
          <InputError message={errors.roles}/>
        </div>
        <Button disabled={processing} className={"w-fit px-10 mx-auto"}>
          {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
          {!processing ? "Update" : "Updating..."}
        </Button>
      </form>
    </SheetContent>
  </Sheet>
}

export default UpdateUserRoleSheet;
