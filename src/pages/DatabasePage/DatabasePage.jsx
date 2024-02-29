import React from 'react';
import './DatabasePage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';
import fetchAxios from '../../fetchAxios/fetchAxios';

import SCRAP from '../../assets/scrap.svg'
import { Link } from 'react-router-dom';

const DatabasePage = () => {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAxios.get(
        '/scraps/.*'
      );
      setProducts(res.data);
    };
    fetchData();
  }, []);

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      setSearch(search);
      console.log(search);
      setLoader(true);
      // Call your search function here
      if(search.length>0){
        const res = await fetchAxios.get(
          `/scraps/${search}`
        );
        setProducts(res.data);
      }else{
        const res = await fetchAxios.get(
          `/scraps/.*`
        );
        setProducts(res.data);
      }
      setLoader(false);
    }
  };
  return (
    <div className='database-page'>
      <div className='top-search-bar'>
        <div className='seach-bar'>
          <div className='search-bar'>
            <svg
              width={25}
              height={24}
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.904 21.75c-5.65 0-10.25-4.6-10.25-10.25s4.6-10.25 10.25-10.25 10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22.404 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z'
                fill='#A1A2AF'
              />
            </svg>
            <input
              placeholder='Enter your item'
              type='text'
              className='search'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      <div className='banner-container '>
        <div className='banner'>
          <div className="banner-left">
            <div className="banner-txt">
            Your gateway to a world of<br></br> scrap materials !
            </div>
            <Link to='/dashboard/scrapify' className="banner-btn">
              Scrapify
            </Link>
          </div>
          <div className="banner-right">
            <img className='scrap-img' src={SCRAP} alt="" />
          </div>
        </div>
      </div>

      <div className='database-head'>Discover all Scraps</div>

      {loader && (
        <div className='lod-contain'>
          <Triangle
            visible={true}
            height='80'
            width='80'
            color='#131736'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      )}

      {products?.length > 0 ? (
        <div className='database-cards'>
          {products?.map((item) => (
            <div className='database-card'>
              <img
                src={`https://scrapy-api-7wnj.onrender.com/image/${item?.imgid}`}
                alt='img'
                className='card-left'
              />
              <div className='card-right'>
                <div className='card-name'>{item?.title}</div>
                <div className='short-desc'>{item?.desc}</div>

                <div className='tabs d-tabs'>
                  <div className='tab yellow s-tab'>
                    <svg
                      width={24}
                      height={24}
                      fill=''
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 16.75c-.4 0-.8-.03-1.18-.1-2.12-.31-4.05-1.53-5.27-3.34A7.767 7.767 0 014.25 9c0-4.27 3.48-7.75 7.75-7.75S19.75 4.73 19.75 9c0 1.54-.45 3.03-1.3 4.31a7.8 7.8 0 01-5.3 3.35c-.35.06-.75.09-1.15.09zm0-14c-3.45 0-6.25 2.8-6.25 6.25 0 1.25.36 2.45 1.04 3.47a6.254 6.254 0 004.26 2.69c.64.11 1.27.11 1.86 0 1.75-.25 3.3-1.24 4.29-2.7a6.232 6.232 0 001.04-3.47c.01-3.44-2.79-6.24-6.24-6.24z'
                        fill=''
                      />
                      <path
                        d='M6.47 22.59c-.14 0-.27-.02-.41-.05-.65-.15-1.15-.65-1.3-1.3l-.35-1.47a.261.261 0 00-.19-.19l-1.65-.39a1.74 1.74 0 01-1.28-1.22c-.17-.61 0-1.27.45-1.72l3.9-3.9c.16-.16.38-.24.6-.22.22.02.42.14.55.33.99 1.46 2.54 2.45 4.27 2.7.64.11 1.27.11 1.86 0 1.75-.25 3.3-1.24 4.29-2.7.12-.19.33-.31.55-.33.22-.02.44.06.6.22l3.9 3.9c.45.45.62 1.11.45 1.72a1.74 1.74 0 01-1.28 1.22l-1.65.39c-.09.02-.16.09-.19.19l-.35 1.47c-.15.65-.65 1.15-1.3 1.3-.65.16-1.32-.07-1.74-.58L12 17.13l-4.2 4.84c-.34.4-.82.62-1.33.62zm-.38-8.56L2.8 17.32c-.09.09-.08.19-.06.25.01.05.06.15.18.17l1.65.39c.65.15 1.15.65 1.3 1.3l.35 1.47c.03.13.13.17.19.19.06.01.16.02.25-.08l3.83-4.41a7.768 7.768 0 01-4.4-2.57zm7.42 2.56l3.83 4.4c.09.11.2.11.26.09.06-.01.15-.06.19-.19l.35-1.47c.15-.65.65-1.15 1.3-1.3l1.65-.39c.12-.03.17-.12.18-.17.02-.05.03-.16-.06-.25l-3.29-3.29a7.793 7.793 0 01-4.41 2.57z'
                        fill=''
                      />
                      <path
                        d='M13.89 12.89c-.26 0-.57-.07-.94-.29l-.95-.57-.95.56c-.87.52-1.44.22-1.65.07-.21-.15-.66-.6-.43-1.59l.24-1.03-.8-.74c-.44-.44-.6-.97-.45-1.45.15-.48.59-.82 1.21-.92l1.07-.18.51-1.12c.29-.57.74-.89 1.25-.89s.97.33 1.25.9l.59 1.18.99.12c.61.1 1.05.44 1.21.92.15.48-.01 1.01-.45 1.45l-.83.83.26.93c.23.99-.22 1.44-.43 1.59-.11.09-.35.23-.7.23zm-4.28-4.5l.69.69c.32.32.48.86.38 1.3l-.19.8.8-.47c.43-.25 1.01-.25 1.43 0l.8.47-.18-.8c-.1-.45.05-.98.37-1.3l.69-.69-.87-.15c-.42-.07-.84-.38-1.03-.76L12 6.5l-.5 1c-.18.37-.6.69-1.02.76l-.87.13z'
                        fill=''
                      />
                    </svg>
                    Quality : {item?.quality_score}
                  </div>
                  <div className='tab blue s-tab'>
                    <svg
                      width={24}
                      height={24}
                      fill=''
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20.62 13.07c-.38 0-.7-.29-.75-.67a7.834 7.834 0 00-3.34-5.61.752.752 0 01-.19-1.04c.24-.34.71-.42 1.04-.19a9.335 9.335 0 013.97 6.68c.04.41-.25.78-.67.83h-.06zM3.49 13.12h-.08a.766.766 0 01-.67-.83c.27-2.69 1.7-5.12 3.91-6.69a.753.753 0 11.87 1.23 7.847 7.847 0 00-3.29 5.62.74.74 0 01-.74.67zM12.06 22.61c-1.48 0-2.89-.34-4.21-1a.75.75 0 01-.33-1.01.75.75 0 011.01-.33 7.904 7.904 0 006.94.06c.37-.18.82-.02 1 .35.18.37.02.82-.35 1-1.28.62-2.64.93-4.06.93zM12.06 8.44a3.53 3.53 0 11-.001-7.059 3.53 3.53 0 01.001 7.059zm0-5.55c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.92-2.03-2.03-2.03zM4.83 20.67a3.53 3.53 0 11-.001-7.059 3.53 3.53 0 01.001 7.059zm0-5.56c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.91-2.03-2.03-2.03zM19.17 20.67a3.53 3.53 0 113.53-3.53c-.01 1.94-1.59 3.53-3.53 3.53zm0-5.56c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03a2.038 2.038 0 00-2.03-2.03z'
                        fill=''
                      />
                    </svg>
                    Recyclability : {item?.recyclability_score}
                  </div>
                  <div className='tab green s-tab'>
                    <svg
                      width={24}
                      height={24}
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13.4 17.42h-2.51c-1.64 0-2.97-1.38-2.97-3.08 0-.41.34-.75.75-.75s.75.34.75.75c0 .87.66 1.58 1.47 1.58h2.51c.65 0 1.19-.58 1.19-1.28 0-.87-.31-1.04-.82-1.22L9.74 12c-.78-.27-1.83-.85-1.83-2.64 0-1.54 1.21-2.78 2.69-2.78h2.51c1.64 0 2.97 1.38 2.97 3.08 0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-.87-.66-1.58-1.47-1.58H10.6c-.65 0-1.19.58-1.19 1.28 0 .87.31 1.04.82 1.22L14.26 12c.78.27 1.83.85 1.83 2.64-.01 1.53-1.21 2.78-2.69 2.78z'
                        fill=''
                      />
                      <path
                        d='M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75z'
                        fill=''
                      />
                      <path
                        d='M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z'
                        fill=''
                      />
                    </svg>
                    EST Price : {item?.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='not-found'>Items not found !</p>
      )}
    </div>
  );
};

export default DatabasePage;
