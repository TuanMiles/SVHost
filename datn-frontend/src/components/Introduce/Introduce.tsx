import FooterHomePage from '../Footer-HomePage'
import HeaderHomePage from '../Header-HomePage'
import Loader from '../Loader'
import styles from './Introduce.module.scss'
import svhosttv from '../../assets/SvHosttv.png';
import svhostbanner from '../../assets/svhostbanner2.png';

const Introduce = () => {
  return (
    <>
      <Loader />
      <HeaderHomePage />
      <div className={`${styles.page_top_banner}`} style={{ backgroundImage: `url(${svhostbanner})` }}></div>
      <div className='max-w-[1111px] m-auto px-4 sm:px-6 lg:px-8'>
        <p className={` mt-4 sm:mt-[40px] mb-[25px] lg:text-xl font-bold`}>Giới Thiệu Về SVHost</p>
        <p className='mb-4 text-[16px]'>
        Về SVHost
Chào mừng bạn đến với SVHost – giải pháp toàn diện cho nhu cầu nhà trọ của bạn!

Tầm nhìn của chúng tôi
SVHost ra đời với sứ mệnh mang lại một nền tảng tiện ích và đáng tin cậy cho mọi người tìm kiếm và cho thuê nhà trọ. Chúng tôi hiểu rằng việc tìm kiếm một nơi ở phù hợp có thể gặp nhiều khó khăn và tốn kém thời gian. Với SVHost, chúng tôi mong muốn biến hành trình tìm kiếm nơi ở của bạn trở nên dễ dàng hơn, an toàn hơn và hiệu quả hơn.

Giá trị cốt lõi
Chất lượng và Uy tín: Chúng tôi cam kết mang đến cho bạn những lựa chọn nhà trọ đa dạng và chất lượng. Mỗi căn nhà, mỗi phòng trọ được giới thiệu trên SVHost đều được chúng tôi kiểm tra kỹ lưỡng và đảm bảo tính chính xác về thông tin.

Tiện lợi và Hiệu quả: Giao diện thân thiện, dễ sử dụng và tích hợp nhiều tính năng tìm kiếm thông minh giúp bạn dễ dàng tìm kiếm căn phòng phù hợp với yêu cầu của mình. Từ việc xem hình ảnh, đọc nhận xét, đến việc liên hệ với chủ nhà, tất cả đều được thực hiện một cách thuận tiện nhất.

An toàn và Minh bạch: Chúng tôi đặt sự an toàn và sự hài lòng của khách hàng lên hàng đầu. Mọi giao dịch trên SVHost đều được thực hiện với mức độ bảo mật cao nhất và thông tin rõ ràng, minh bạch, giúp bạn hoàn toàn yên tâm khi sử dụng dịch vụ của chúng tôi.

Đội ngũ của chúng tôi
Đội ngũ SVHost bao gồm những cá nhân trẻ trung, nhiệt huyết và có kinh nghiệm trong lĩnh vực bất động sản và công nghệ thông tin. Chúng tôi luôn nỗ lực không ngừng để mang đến cho bạn những trải nghiệm tốt nhất khi sử dụng dịch vụ của chúng tôi. Mỗi thành viên của SVHost đều chia sẻ chung một tâm huyết: giúp bạn tìm được nơi ở lý tưởng mà không phải lo lắng về chất lượng và chi phí.

Tại sao chọn SVHost?
Danh sách phong phú: Với hàng ngàn lựa chọn nhà trọ khắp cả nước, bạn chắc chắn sẽ tìm thấy nơi ở ưng ý tại SVHost.
Hỗ trợ tận tâm: Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc, mọi nơi.
Cập nhật liên tục: Thông tin về các căn nhà, phòng trọ luôn được cập nhật mới nhất, đảm bảo bạn luôn tiếp cận được những cơ hội tốt nhất.
Kết nối với chúng tôi
Chúng tôi rất mong nhận được sự ủng hộ và phản hồi từ bạn để ngày càng hoàn thiện dịch vụ của mình hơn. Hãy kết nối với SVHost qua các kênh truyền thông xã hội hoặc liên hệ trực tiếp với chúng tôi để được tư vấn chi tiết.

SVHost – nơi bắt đầu của những hành trình mới, nơi an cư của bạn!


        </p>
        <p>
          <img
            className='w-[90%] max-w-[90%] mt-[50px] ml-[15%] mx-auto'
            src={svhosttv}
            alt=''
          />
        </p>
      </div>
      <FooterHomePage />
    </>
  )
}

export default Introduce
