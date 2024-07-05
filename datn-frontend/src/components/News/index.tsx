import { Button } from '..'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import { useGetAllBlogsQuery } from '../../api/NewBlogs'

const News = () => {
  const navigate = useNavigate()
  const { data: blogData } = useGetAllBlogsQuery()
  const handleNavigateBlogDeatail = (blogData: any) => {
    navigate(`/blogs/${blogData._id}`)
  }

  return (
    <div className='container mx-auto'>
      <div className='title flex flex-col items-center mb-8'>
        <h4 className='text-[#ef233c] text-[22px] mb-[5px] font-bold'>Tin Tức và Khuyến Mãi</h4>
        <h3 className='md:text-4xl mb-2 text-3xl font-bold text-center text-black uppercase'>
          KHÁM PHÁ NHẬN NGAY KHUYẾN MÃI
        </h3>
        {/* <div className='bg_title'></div> */}
      </div>
      <div className='news-content md:flex-row  flex flex-col justify-center mb-10'>
        <div className='left md:w-1/2 flex flex-wrap w-full mr-2'>
          <div
            title={blogData?.docs[0]?.name}
            onClick={() => handleNavigateBlogDeatail(blogData?.docs[0])}
            className='block cursor-pointer w-full m-0 bg-[#f5f5f5] mb-[30px] transition-all group shadow-[3.5px_6px_18px_0_rgb(0,0,0/10%)]'
          >
            <div className='img overflow-hidden'>
              <img
                className='w-full max-h-[333px] object-cover transition-all group-hover:scale-[1.1]'
                src={blogData && blogData?.docs[0]?.images[0]?.url}
                alt={blogData && blogData?.docs[0]?.name}
              />
            </div>
            <div className='info p-[15px]'>
              <div className='title'>
                <h3 className='text-sm uppercase mb-[5px] text-[#282828] font-[700] line-clamp-2'>
                  {blogData && blogData?.docs[0]?.name}
                </h3>
              </div>
              <div className='description mt-8'>
                {ReactHtmlParser(
                  blogData && blogData.docs[0]?.description?.length > 200
                    ? blogData?.docs[0].description.slice(0, 200) + '[...]'
                    : ''
                )}
              </div>
              <div className='btn mt-4'>
                <Button
                  size='medium'
                  shape='square'
                  style='hover:bg-white hover:text-[#d3b673] hover:border hover:border-[#d3b673]'
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
          {blogData &&
            blogData?.docs?.slice(1, 5).map((blog, index: number) => (
              <div
                onClick={() => handleNavigateBlogDeatail(blog)}
                key={index + blog.name}
                title={blog.name}
                className='cursor-pointer mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group'
              >
                {/* <div className='img overflow-hidden'>
                  <img
                    className='w-full min-h-[95px] max-h-[95px] md:max-h-[150px] object-cover transition-all group-hover:scale-[1.1]'
                    src={blog.images[0].url}
                    alt={blog.name}
                  />
                </div> */}
                {/* <div className='info p-[15px] '>
                  <div className='title'>
                    <h3 className='text-sm uppercase mb-[5px] font-[700] text-[#282828] line-clamp-2'>{blog.name}</h3>
                  </div>
                </div> */}
              </div>
            ))}

          {/* <Link
            to='/'
            className='mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group'
          >
            <div className='img overflow-hidden'>
              <img
                className='w-full max-h-[150px] transition-all group-hover:scale-[1.1]'
                src='https://tocotocotea.com/wp-content/uploads/2022/07/Hinh-thumb-2-scaled.jpg'
                alt=''
              />
            </div>
            <div className='info p-[15px] '>
              <div className='title'>
                <h3 className='text-sm uppercase mb-[5px] font-[700] text-[#282828]'>
                  “cháy” cùng hàng trăm học sinh Amsterdam và Chuyên Ngoại Ngữ trong chương trình Camp Aletheia
                </h3>
              </div>
            </div>
          </Link>
          <Link
            to='/'
            className='mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group'
          >
            <div className='img overflow-hidden'>
              <img
                className='w-full  max-h-[150px] transition-all group-hover:scale-[1.1]'
                src='https://tocotocotea.com/wp-content/uploads/2022/07/Hinh-thumb-2-scaled.jpg'
                alt=''
              />
            </div>
            <div className='info p-[15px] '>
              <div className='title'>
                <h3 className='text-sm uppercase mb-[5px] font-[700] text-[#282828]'>
                  “cháy” cùng hàng trăm học sinh Amsterdam và Chuyên Ngoại Ngữ trong chương trình Camp Aletheia
                </h3>
              </div>
            </div>
          </Link> */}
        </div>

        {/* right */}
        <div className='right md:w-1/2 md:ml-2 w-full'>
          <div className='main-content '>
            <Link to='/' className='group '>
              <div className='relative overflow-hidden'>
                <div className='img'>
                  <img
                    className='w-full transition-all group-hover:scale-[1.1] h-[80%]'
                    src='/2-ceo-tiktok-didongviet.jpg'
                    alt=''

                  />
                </div>
                <div className='title py-2 px-1 absolute bottom-10 shadow-[0_2px_9px]'>
                  <h3 className='text-white text-center text-sm md:text-[18px]'>
                    CON ĐƯỜNG KHỞI NGHIỆP CỦA NGƯỜI SÁNG LẬP THƯƠNG HIỆU KHÁCH SẠN THÚ CƯNG -
                  </h3>
                </div>
              </div>
            </Link>
            <div className='flex flex-col gap-y-6 items-center mt-[30px]'>
              <Link to='/' className='group'>
                <div className='gap-x-4 flex items-center overflow-hidden'>
                  <div className='img w-[160px]'>
                    <img
                      className='w-full transition-all group-hover:scale-[1.1]'
                      src='https://tocotocotea.com/wp-content/uploads/2021/07/TACO_THU%CC%9BO%CC%9BNG-HIE%CC%A3%CC%82U-TIE%CC%82U-BIE%CC%82%CC%89U-CHA%CC%82U-A%CC%81-THA%CC%81I-BI%CC%80NH-DU%CC%9BO%CC%9BNG-2021.jpg'
                      alt=''
                    />
                  </div>
                  <div className='title'>
                    <h4 className='text-[#282828] text-[16px] font-[700]'>
                      đạt top 10 thương hiệu Châu Á Thái Bình Dương 2021
                    </h4>
                  </div>
                </div>
              </Link>
              <Link to='/' className='group'>
                <div className='gap-x-4 flex items-center overflow-hidden'>
                  <div className='img w-[160px]'>
                    <img
                      className='w-full transition-all group-hover:scale-[1.1]'
                      src='https://tocotocotea.com/wp-content/uploads/2021/07/TACO_THU%CC%9BO%CC%9BNG-HIE%CC%A3%CC%82U-TIE%CC%82U-BIE%CC%82%CC%89U-CHA%CC%82U-A%CC%81-THA%CC%81I-BI%CC%80NH-DU%CC%9BO%CC%9BNG-2021.jpg'
                      alt=''
                    />
                  </div>
                  <div className='title'>
                    <h4 className='text-[#282828] text-[16px] font-[700]'>
                      đạt top 7 thương hiệu Châu Á Thái Bình Dương 2023
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
