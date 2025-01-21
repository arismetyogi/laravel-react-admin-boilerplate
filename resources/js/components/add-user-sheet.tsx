import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {router, useForm} from "@inertiajs/react";
import {DialogProps} from "@radix-ui/react-dialog";
import {Label} from "@headlessui/react";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";
import TextInput from "@/components/text-input";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {toast} from "react-hot-toast";
import InputLabel from "@/components/input-label";

type FormType = {
  name: string,
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  image: File | undefined,
}

const AddUserSheet = ({onOpenChange, ...props}: DialogProps) => {
  const {data, setData, post, errors, reset, processing} = useForm<FormType>({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: undefined,
  });

  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault();
    post(route('users.store'), {
      onSuccess: () => {
        toast.success("New user has been created successfully.");
        reset();
        onOpenChange?.(false); //Close sheet on success
      },
    });
  };

  return <Sheet onOpenChange={onOpenChange} {...props}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a New User</SheetTitle>
        <SheetDescription/>
      </SheetHeader>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="space-y1 col-span-full">
          <InputLabel>Full Name</InputLabel>
          <TextInput
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          <InputError message={errors.name}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Username</InputLabel>
          <TextInput
            value={data.username}
            onChange={(e) => setData("username", e.target.value)}
          />
          <InputError message={errors.username}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Email</InputLabel>
          <TextInput
            value={data.email}
            type="email"
            onChange={(e) => setData("email", e.target.value)}
          />
          <InputError message={errors.email}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Profile Picture</InputLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setData("image", e.target.files?.[0])}
          />
          <InputError message={errors.image}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Password</InputLabel>
          <TextInput
            value={data.password}
            type="password"
            onChange={(e) => setData("password", e.target.value)}
          />
          <InputError message={errors.password}/>
        </div>
        <div className="space-y1 w-full">
          <InputLabel>Password Confirmation</InputLabel>
          <TextInput
            value={data.password_confirmation}
            type="password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />
          <InputError message={errors.password_confirmation}/>
        </div>
        <Button disabled={processing}>
          {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
          {!processing ? "Save" : "Saving..."}
        </Button>
      </form>
    </SheetContent>
  </Sheet>
}

export default AddUserSheet;
