import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {useForm} from "@inertiajs/react";
import {DialogProps} from "@radix-ui/react-dialog";
import {Input} from "@/components/ui/input";
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

type FormType = {
  name: string,
  username: string,
  email: string,
  image: File | undefined,
}

type Props = DialogProps &{
  selected: User,
}

const EditUserSheet = ({onOpenChange, selected, ...props}: Props) => {
  const {data, setData, post, errors, reset, processing} = useForm<FormType>({
    name: selected.name,
    username: selected.username,
    email: selected.email,
    image: undefined,
  });

  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault();
    post(route('user.store'), {
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
        <SheetTitle>Edit User: {selected.name}</SheetTitle>
        <SheetDescription/>
      </SheetHeader>
      <Avatar>
        <div className="w-24 h-24 items-center mx-auto bg-slate-100 text-center content-center overflow-hidden bg-clip-content rounded-full mt-5 text-4xl">
          <AvatarImage src={selected.avatar} />
          <AvatarFallback>{getAvatar(selected.name)}</AvatarFallback>
        </div>
      </Avatar>

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
            className="w-full col-span-full"
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
        <Button disabled={processing}>
          {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
          {!processing ? "Updated" : "Updating..."}
        </Button>
      </form>
    </SheetContent>
  </Sheet>
}

export default EditUserSheet;
