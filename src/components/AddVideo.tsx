import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import BlueButton from "./buttons/BlueButton";
import { useAddVideoMutation } from "../services/videos.service";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface Props {
    handleClose: () => void;
    changeVideos: () => void;
}

const AddVideo: FC<Props> = ({handleClose, changeVideos}) => {

    const handleFormClick = (event: MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }

    const [loader, setLoader] = useState(false);

    const [types, setTypes] = useState<string[]>([]);
    const [preview, setPreview] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [addVideo] = useAddVideoMutation();

    const handleAddType = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const newType = event.currentTarget.value.trim();
            if (newType && !types.includes(newType)) {
                setTypes([...types, newType]);
                event.currentTarget.value = '';
            }
        }
    }

    const handleAddVideo = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoader(true)
        const formData = new FormData(event.currentTarget);
        const newFormData = new FormData();
        newFormData.append('title', formData.get('title') as string);
        newFormData.append('description', formData.get('description') as string);
        newFormData.append('types', types.join(","));
        
        const previewImage = formData.get('preview') as File;
        const video = formData.get('video') as File;

        newFormData.append("preview", previewImage);
        newFormData.append("video", video);  
        
        if(previewImage.name === "" || video.name === "") {
            toast.error("Please pick preview and video!")
            setLoader(false)
            return
        }
        
        try {
            const response = await addVideo(newFormData).unwrap();
            toast.success(response || "Video added successfully!");
            changeVideos();
            handleClose();
            setLoader(false)
        } catch (error) {   
            toast.error("Failed to add video");
            setLoader(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handlePreviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPreview(event.target.files[0].name);
        }
    }

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideo(event.target.files[0].name);
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/75 overflow-hidden" onClick={handleClose}>
            <form className="p-6 bg-black border-4 border-dark-blue rounded-20 flex flex-col gap-6 items-center relative" onClick={(e) => handleFormClick(e)} onSubmit={handleAddVideo}>
                {loader && (
                    <div className="absolute inset-0 w-full bg-black/75 h-full flex justify-center items-center rounded-20">
                        <Loader />
                    </div>
                )}
                <h2 className="text-white text-3xl font-bold">Форма додавання відео</h2>
                <div className="flex items-center text-xl text-white gap-6 w-full">
                    <label className="flex-1">Назва відео</label>
                    <input type="text" className="px-6 py-1.5 text-black min-w-[450px] rounded-20" placeholder="Назва відео" name="title" required/>
                </div>
                <div className="flex items-start text-xl text-white gap-6 w-full">
                    <label className="flex-1">Опис відео</label>
                    <textarea className="px-6 py-1.5 text-black min-w-[450px] rounded-20 h-[100px]" placeholder="Опис відео" name="description" />
                </div>
                <div className="flex items-center text-xl text-white gap-6 w-full">
                    <label className="flex-1">Тип відео</label>
                    <input type="text" className="px-6 py-1.5 text-black min-w-[450px] rounded-20" placeholder="Тип відео" onKeyDown={handleAddType}/>
                </div>
                {types.length !== 0 && (
                     <div className="flex items-center text-xl text-white gap-6 w-full">
                        <div className="flex-1"></div>
                        <div className="flex flex-wrap items-start min-w-[450px] gap-1">
                            {types.map((item, index) => (
                                <div className="text-white bg-dark-blue py-1 px-3 rounded-20 font-medium" key={index}>{item}</div>
                            ))}
                        </div>
                     </div>
                )}
                <div className="flex w-full h-[50px] border-2 border-white rounded-20 border-dashed">
                    <label className="flex justify-center items-center w-full cursor-pointer">
                        <span className="text-xl text-white">{video ? video : "Додати відео"}</span>
                        <input type="file" className="hidden" accept="video/*" name="video" onChange={handleVideoChange}/>
                    </label>
                </div>
                <div className="flex w-full h-[50px] border-2 border-white rounded-20 border-dashed">
                    <label className="flex justify-center items-center w-full cursor-pointer">
                        <span className="text-xl text-white">{preview ? preview : "Додати фото"}</span>
                        <input type="file" className="hidden" accept="image/*" name="preview" onChange={handlePreviewChange}/>
                    </label>
                </div>
                <BlueButton type="submit">Додати відео</BlueButton>
            </form>
        </div>
    )
}

export default AddVideo