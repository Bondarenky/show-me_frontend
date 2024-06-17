import { FC, useEffect, useState } from "react";
import { useEditUserDataMutation, useGetUserQuery } from "../services/user.service";
import Header from "../components/Header";
import UserNavigation from "../components/UserNavigation";
import ProfileInput from "../components/inputs/ProfileInput";
import BlueButton from "../components/buttons/BlueButton";
import { FaPencil, FaRegCircleUser } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import Video from "../components/Video";
import AddVideo from "../components/AddVideo";
import { toast } from "react-toastify";

const MyProfile: FC = () => {
    const userId = localStorage.getItem("userId")
    const {data: userDataResponse, refetch: refetchUserData} = useGetUserQuery(userId || "", {
        skip: !userId
    })
    const [editUserData] = useEditUserDataMutation()
    
    const [userName, setUserName] = useState(userDataResponse?.userName || "")
    const [inputsState, setInputsState] = useState(true)
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    };

    const handleEditUserData = () => {
        setInputsState(state => !state);
    }

    const handleSubmitEdit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInputsState(true);
        const formData = new FormData(event.currentTarget);
        const newFormData = new FormData();
        const image = formData.get('image') as File;
        
        newFormData.append("userId", userId as string);
        newFormData.append("name", userName);
        newFormData.append("image", image);
        
        try {
            const response = await editUserData(newFormData).unwrap();
            toast.success(response || "Data has been updated!");
            refetchUserData()
        } catch (error) {   
            toast.error("Failed to update data");
        }
    }

    const handleToggleVideoModal = () => {
        setShowVideoModal(state => !state);
    }

    useEffect(() => {
        if(userDataResponse) {
            setUserName(userDataResponse.userName)
        }
    }, [userDataResponse])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col gap-7 z-0 py-4 flex-1">
            <Header>
                <>
                    <div>
                        <img src="logo.png" alt="logo" />
                    </div>
                    <UserNavigation />
                </>
            </Header>
            <div className="px-12 flex flex-col gap-12">
                <form className="flex gap-12 items-center relative" onSubmit={handleSubmitEdit}>
                    <div className="relative rounded-full overflow-hidden w-56 h-56 bg-white/35 group">
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                        )}
                        {!selectedImage && userDataResponse?.userImageUrl && (
                            <img src={userDataResponse.userImageUrl} alt="Profile" className="w-full h-full object-cover" />
                        )}
                        {!selectedImage && !userDataResponse?.userImageUrl && (
                            <div className="text-white flex justify-center items-center">
                                <FaRegCircleUser size={224} />
                            </div>
                        )}
                        {!inputsState && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black/75 justify-center items-center hidden group-hover:flex">
                                <label className="cursor-pointer">
                                    <span className="text-white text-xl text-medium">Редагувати фото</span>
                                    <input type="file" className="hidden" onChange={handleImageChange} name="image"/>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col gap-7">
                        <div>
                            <div className="flex flex-col gap-7 items-start">
                                <ProfileInput name="username" onChange={handleInputChange} value={userName} disabled={inputsState} /> 
                                <ProfileInput name="email" onChange={handleInputChange} value={userDataResponse?.userEmail || ""} disabled={true} /> 
                                {inputsState && (
                                    <BlueButton type="button" onClick={handleEditUserData} styles="px-4 rounded-20">
                                        <div className="flex gap-5 items-center">
                                            <FaPencil size={32}/>
                                            <div>Редагувати</div>
                                        </div>
                                    </BlueButton>
                                )}
                                {!inputsState && (
                                    <BlueButton type="submit" styles="px-4 rounded-20" onClick={refetchUserData}>
                                        <div className="flex gap-5 items-center">
                                            <FiSave size={32}/>
                                            <div>Зберегти</div>
                                        </div>
                                    </BlueButton>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <BlueButton type="button" styles="px-4 rounded-20" onClick={handleToggleVideoModal}>
                                <div className="flex gap-5 items-center">
                                    <IoIosAddCircleOutline size={32}/>
                                    <div>Завантажити нове відео</div>
                                </div>
                            </BlueButton>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-12">
                    <h4 className="text-3xl text-white font-bold">Завантажені відео</h4>
                    <div className="flex flex-wrap gap gap-x-16 gap-y-16">
                        {userDataResponse?.videos && userDataResponse.videos.length !== 0 && userDataResponse.videos.map(video => (
                            <Video channelImg={video.userImageUrl} channelPath={video.userId} channelTitle={video.userName} img={video.videoPreviewUrl} videoId={video.videoId} title={video.videoTitle} key={video.videoId}/> 
                        ))}
                        {userDataResponse?.videos && userDataResponse.videos.length === 0 && (
                            <div className="flex justify-center w-full">
                                <p className="text-3xl text-white">Немає завантажених відео!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showVideoModal && (
                <AddVideo handleClose={handleToggleVideoModal} changeVideos={refetchUserData}/>
            )}
        </div>
    )
}

export default MyProfile;