import { FC, useEffect, useState } from "react"
import Header from "../components/Header";
import Search from "../components/inputs/Search";
import UserNavigation from "../components/UserNavigation";
import FilterButton from "../components/buttons/FilterButton";
import Video from "../components/Video";
import { useGetAllVideosMutation, useGetVideosTypesQuery } from "../services/videos.service";

const Home: FC = () => {
    const [searchData, setSearchData] = useState("");
    const [videoType, setVideoType] = useState<string>("");
    const [searchValue, setSearchValue] = useState(searchData);

    const {data: videosTypesData} = useGetVideosTypesQuery("");
    const [getAllVideos, {data: allVideosResponse}] = useGetAllVideosMutation();

    useEffect(() => {
        getAllVideos({searchText: searchData, type: videoType})
    }, [searchData, videoType])

    useEffect(() => {
        if(searchValue === "") {
            setSearchData("")
        }
    }, [searchValue])

    const handleSearch = (value: string) => {
        setSearchData(value);
    }

    const handleSelectVideoType = (value: string) => {
        setVideoType(value);
    }

    return (
        <div className="flex flex-col gap-12 z-0 py-4">
            <Header>
                <>
                    <div>
                        <img src="logo.png" alt="logo" />
                    </div>
                    <Search value={searchData} placeholder="Search" onSearch={handleSearch} handleChangeSearch={setSearchValue}/>
                    <UserNavigation/>
                </>
            </Header>
            <div className="px-12 flex flex-col gap-12">
                {videosTypesData && videosTypesData?.length !== 0 && (
                    <div className="flex overflow-x-auto gap-12 pb-4">
                        {videosTypesData?.map(videosType => (
                            <FilterButton handleClick={handleSelectVideoType} selectedType={videoType} videoType={videosType.name} key={videosType.name}>{videosType.name}</FilterButton>
                        ))}
                    </div>
                )}
                <div className="flex flex-wrap gap-x-16 gap-y-16">
                    {allVideosResponse && allVideosResponse.map(video => (
                        <Video channelImg={video.userImageUrl} channelPath={video.userId} channelTitle={video.userName} img={video.videoPreviewUrl} title={video.videoTitle} videoId={video.videoId} key={video.videoId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;