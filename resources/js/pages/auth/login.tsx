import {FormEventHandler, useEffect} from "react";
import GuestLayout from "@/layouts/guest-layout";
import {Head, Link, useForm} from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {InputError} from "@/components/ui/input-error";
import axios from "axios";

export default function Login({
                                status,
                                canResetPassword,
                              }: {
  status?: string;
  canResetPassword: boolean;
}) {
  const {data, setData, post, processing, errors, setError, reset} = useForm({
    creds: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError({creds: "", password: "", remember: ""}); // Clear errors before submitting

    try {
      const response = await axios.post("/login", data);
      // console.log(response.data); // Handle successful login
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors); // Set validation errors
      } else {
        // console.error("Unexpected error:", error);
      }
    }
    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in"/>

      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username/email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <div className="mb-4 font-medium text-sm text-green-600">
                {status}
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="creds">Username/Email</Label>
                <Input
                  id="creds"
                  type="text"
                  value={data.creds}
                  onChange={(e) =>
                    setData("creds", e.target.value)
                  }
                  required
                />
                <InputError message={errors.creds}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={route("password.request")}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData("password", e.target.value)
                  }
                  required
                />
                <InputError message={errors.password}/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </GuestLayout>
  );
}
