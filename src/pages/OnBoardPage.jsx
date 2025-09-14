import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { completeOnboarding } from "../lib/api.js";
import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants/index.js";

const OnBoardPage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguages: authUser?.learningLanguages || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const queryClient = useQueryClient();
  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  };
  const generateRandomAvatar = () => {
    const inx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${inx}.png`;
    setFormState({ ...formState, profilePic: avatar });
    toast.success("Random profile picture generated");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete your Profile
          </h1>
          <form onSubmit={handleSubmit}>
            {/*PROFILE PIC CONTAINER */}
            <div className="flex flex-col justify-center items-center space-y-4">
              {/*PROFILE PIC IMAGE */}
              <div className="size-32 rounded-full bg-base-300 overflow-hiddden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex justify-center items-center">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/*GENERATE RANDOM AVATAR BUTTON */}
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-accent"
                  onClick={generateRandomAvatar}
                  type="button"
                >
                  <ShuffleIcon className="mr-2 size-4" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/*FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">FullName</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>
            {/*BIO FIELD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>
            {/*Languages Container*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/*NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formState.nativeLanguage}
                  name="nativeLanguage"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select Your Native Language</option>
                  {LANGUAGES.map((lang) => (
                    <option value={lang.toLowerCase()} key={`native-${lang}`}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/*LEARNING LANGUAGES */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Languages</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formState.learningLanguages}
                  name="nativeLanguage"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguages: e.target.value,
                    })
                  }
                >
                  <option value="">Select Your Learning Language</option>
                  {LANGUAGES.map((lang) => (
                    <option value={lang.toLowerCase()} key={`native-${lang}`}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/*LOCATION CONTAINER */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  value={formState.location}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/*SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete OnBoarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardPage;
