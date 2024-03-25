import Image from "next/image";
import search from "@/assets/icons/search.svg";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onSearch(keyword);
  };

  return (
    <div
      className="w-full h-8 bg-transparent rounded-full flex items-center justify-between border border-black px-3
    "
    >
      <input
        type="text"
        className="w-full h-full bg-transparent text-left text-sm font-pretendard font-normal placeholder:custom_gray placeholder:font-pretendard placeholder:font-normal focus:outline-none
        "
        placeholder="가수/제목 검색"
        onChange={handleInputChange}
      />
      <Image
        src={search}
        alt="search"
        className="w-4 h-4 
      "
      />
    </div>
  );
};

export default SearchBar;
