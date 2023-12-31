import Image from "next/image";

interface UserPostProps {
  userImage: string;
  username: string;
}

const UserPost: React.FC<UserPostProps> = ({ userImage, username }) => {
  return (
    <div className="p-6 flex justify-start border-b-[1px] border-neutral-800">
      <div className="flex gap-x-3">
        <div className="w-80">
          <Image src={userImage} width={64} height={64} alt="Фото" className="rounded-full object-cover" />
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">{username}</h2>
          <p>
            Welcome to the "Awesome ChatGPT Prompts" repository! This is a collection of prompt examples to be used with the
            ChatGPT model. The ChatGPT model is a large language model trained by OpenAI that is capable of generating human-like
            text. By providing it with a prompt, it can generate responses that continue the conversation or expand on the given
            prompt. In this repository, you will find a variety of prompts that can be used with ChatGPT. We encourage you to add
            your own prompts to the list, and to use ChatGPT to generate new prompts as well. To get started, simply clone this
            repository and use the prompts in the README.md file as input for ChatGPT. You can also use the prompts in this file
            as inspiration for creating your own. We hope you find these prompts useful and have fun using ChatGPT!
          </p>
        </div>
      </div>

      <div></div>
    </div>
  );
};
export default UserPost;
