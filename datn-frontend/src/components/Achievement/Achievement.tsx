import FooterHomePage from '../Footer-HomePage'
import HeaderHomePage from '../Header-HomePage'
import Loader from '../Loader'
import styles from './Achievement.module.scss'
import svhostbanner from '../../assets/svhostbanner2.png';

const Achievement = () => {
  return (
    <>
      <Loader />
      <HeaderHomePage />
      <div className={`${styles.page_top_banner}`}
        style={{ backgroundImage: `url(${svhostbanner})` }}
      ></div>
      <div className='max-w-[1111px] m-auto px-4 sm:px-6 lg:px-8'>
        <p className={` mt-4 sm:mt-[40px] mb-[25px] lg:text-xl font-bold`}>Thành tựu đạt được</p>
        <p className='mb-4 text-[16px]'>
Kể từ khi ra mắt, SVHost đã không ngừng phấn đấu để trở thành nền tảng hàng đầu trong lĩnh vực cho thuê nhà trọ tại Việt Nam. <br/>Qua nhiều năm hoạt động, chúng tôi tự hào đã gặt hái được nhiều thành tựu đáng kể, khẳng định vị thế của mình trên thị trường và góp phần mang lại những giải pháp an cư tốt nhất cho khách hàng.

Tăng Trưởng Người Dùng Ấn Tượng
SVHost đã chứng kiến sự tăng trưởng vượt bậc về số lượng người dùng. Từ những ngày đầu khởi nghiệp với con số khiêm tốn, đến nay chúng tôi đã thu hút hàng trăm nghìn người dùng trên khắp cả nước. Điều này không chỉ thể hiện sự tin tưởng của khách hàng mà còn khẳng định tầm ảnh hưởng và uy tín của SVHost trên thị trường nhà trọ trực tuyến.

Phát Triển Mạng Lưới Nhà Trọ Phong Phú
Một trong những thành tựu lớn nhất của SVHost là phát triển mạng lưới nhà trọ rộng khắp, đáp ứng nhu cầu đa dạng của người dùng. Với hàng ngàn lựa chọn nhà trọ tại nhiều tỉnh thành, từ các khu vực trung tâm đến vùng ngoại ô, SVHost đã giúp hàng nghìn người tìm được nơi ở phù hợp, từ sinh viên, người lao động đến các chuyên gia.

Hợp Tác Chiến Lược Với Nhiều Đối Tác Lớn
SVHost đã thành công trong việc thiết lập và duy trì mối quan hệ hợp tác chiến lược với nhiều đối tác lớn trong ngành bất động sản và công nghệ. Các đối tác của chúng tôi không chỉ bao gồm các chủ nhà trọ, doanh nghiệp mà còn là các tập đoàn công nghệ lớn, giúp SVHost tiếp cận và ứng dụng các giải pháp công nghệ tiên tiến, nâng cao chất lượng dịch vụ và trải nghiệm người dùng.

Giải Thưởng và Sự Công Nhận
Với những nỗ lực không ngừng nghỉ, SVHost đã được ghi nhận và vinh danh với nhiều giải thưởng uy tín trong ngành. Chúng tôi đã được trao giải "Nền tảng nhà trọ xuất sắc" do Hiệp hội Bất động sản Việt Nam trao tặng và lọt vào danh sách "Top 10 Startup triển vọng" do Tạp chí Kinh tế Việt Nam bình chọn. Những giải thưởng này là minh chứng rõ ràng nhất cho sự nỗ lực và cống hiến của toàn bộ đội ngũ SVHost.

Cải Tiến Công Nghệ và Dịch Vụ
SVHost luôn đặt mục tiêu cải tiến không ngừng để mang lại những trải nghiệm tốt nhất cho khách hàng. 
<br/>Chúng tôi đã đầu tư mạnh mẽ vào việc phát triển công nghệ và tối ưu hóa dịch vụ. Gần đây, SVHost đã ra mắt phiên bản ứng dụng di động với nhiều tính năng mới, giúp người dùng dễ dàng tìm kiếm và đặt phòng mọi lúc, mọi nơi. Ngoài ra, chúng tôi cũng đã áp dụng các giải pháp trí tuệ nhân tạo để cung cấp gợi ý nhà trọ phù hợp với nhu cầu cá nhân hóa của từng khách hàng.

Đóng Góp Xã Hội
SVHost không chỉ chú trọng đến phát triển kinh doanh mà còn quan tâm đến các hoạt động xã hội. Chúng tôi đã tham gia nhiều chương trình hỗ trợ cộng đồng như cung cấp nhà trọ miễn phí cho sinh viên có hoàn cảnh khó khăn, hỗ trợ nơi ở cho người lao động mất việc do ảnh hưởng của dịch bệnh COVID-19. Những hoạt động này không chỉ giúp đỡ những người cần sự hỗ trợ mà còn thể hiện trách nhiệm xã hội của SVHost đối với cộng đồng.

Kết Luận
Với những thành tựu nổi bật đã đạt được, SVHost tự hào đã góp phần cải thiện cuộc sống của hàng ngàn người dùng và trở thành đối tác tin cậy trong lĩnh vực nhà trọ. Chúng tôi cam kết sẽ tiếp tục nỗ lực không ngừng để mang lại những giải pháp nhà trọ tốt nhất, đáp ứng nhu cầu của khách hàng và góp phần xây dựng một cộng đồng an cư vững mạnh.


        </p>
    
      </div>
      <FooterHomePage />
    </>
  )
}

export default Achievement
