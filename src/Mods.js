import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

const Items = ({ currentItems }) => {
    return (
        <>
            {currentItems && currentItems.map((item, index) => (
                <div className="flex flex-col bg-slate-800" key={index}>
                    <div className="aspect-[16/9] relative">
                        <span className="block box-border overflow-hidden bg-none opacity-100 border-none m-0 p-0 absolute top-0 left-0 right-0 bottom-0">
                            <img
                                src={item.preview}
                                alt={item.name}
                                className="absolute top-0 left-0 right-0 bottom-0 box-border p-0 m-auto border-none w-0 h-0 min-h-full max-h-full min-w-full max-w-full object-cover"
                            />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent"></div>
                        <div className="flex items-end p-1 justify-between">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 sm:h-3 sm:w-3 text-[#E8EAE9]">
                                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path>
                                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path>
                                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path>
                                </svg>
                                <span className="text-xs ml-1">70.18 MB</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 sm:h-3 sm:w-3 text-[#E8EAE9]">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                </svg>
                                <span className="text-xs ml-1">{item.avarageRating} %</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-black/60 flex-1 p-4">
                        <h2 className="text-white break-words group-hover:underline">{item.name}</h2>
                        <span className="text-sm mt-1 text-white/50">by {item.author}</span>
                    </div>
                </div>
            ))}
        </>
    );
  }

function Mods() {

    const [jsonData, setJsonData] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);

    const getJsonData = async () => {
        let data = JSON.parse(localStorage.getItem('reforger-workshop-cache'));

        if (data === null) {
            console.log('New API request')
            let response = await fetch('https://files.ofpisnotdead.com/reforger-workshop.json');
            data = await response.json();
        }
        localStorage.setItem('reforger-workshop-cache', JSON.stringify(data));
        return data;
    };

    useEffect(() => {
        getJsonData().then(data => {
            setJsonData(data);
        }); 
    }, []);

    if (jsonData === null) {
        return null;
    }

    const items = jsonData.data;
    let itemsPerPage = 12;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <section>
                <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Items currentItems={currentItems} />
                    </div>
                    <div className="mt-8 inline-block mx-auto">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}

                            className='pagination'
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Mods;
