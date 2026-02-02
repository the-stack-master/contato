import SignUpServer from "@/components/serverComponents/SignUpServer";

export const revalidate = 60;

const SignUpPage = () => {
  return (
    <div>
      <SignUpServer />
    </div>
  );
};

export default SignUpPage;
