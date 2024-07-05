const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['vi'] }); //
//
const axios = require('axios');

//AFFSS11K câu hỏi 1
manager.addDocument('vi', 'Làm thế nào để booking 1 phòng cơ bản?', 'AFFSS11K');
manager.addDocument('vi', 'Có thể tạo một đơn booking phòng như thế nào?', 'AFFSS11K');
manager.addDocument('vi', 'Làm sao để booking?', 'AFFSS11K');
manager.addDocument('vi', 'Có cách nào để đặt 1 phòng cho mèo?', 'AFFSS11K');
manager.addDocument('vi', 'Làm thế nào để đặt một booking?', 'AFFSS11K');
manager.addDocument('vi', 'Có thể đặt một ly trà sữa như thế nào?', 'AFFSS11K');
manager.addDocument('vi', 'Cách để mua trà sữa?', 'AFFSS11K');
manager.addDocument('vi', 'Có thể đặt một ly trà sữa như thế nào?', 'AFFSS11K');
manager.addDocument('vi', 'Có cách nào để tạo một đơn hàng trà sữa đơn giản không?', 'AFFSS11K');
//Ans
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Bạn có thể sử dụng tài khoản đăng nhập của mình để booking phòng.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Điền thông tin đầy đủ, bao gồm số điện thoại và địa chỉ, vào biểu mẫu để booking phòng một cách nhanh chóng.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Sử dụng tính năng đăng nhập để booking phòng một cách thuận tiện.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Điền đầy đủ thông tin cá nhân, bao gồm số điện thoại và địa chỉ, để booking phòng một cách nhanh nhất.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Bạn có thể đăng nhập vào tài khoản của mình và sử dụng tính năng tạo đơn hàng để đặt trà sữa.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Điền thông tin cá nhân, bao gồm số điện thoại và địa chỉ, vào biểu mẫu để booking phòng một cách tiện lợi.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Sử dụng chức năng đăng nhập và điền đầy đủ thông tin cá nhân để booking phòng.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Đăng nhập vào tài khoản của bạn và thực hiện việc booking phòng bằng cách điền đầy đủ thông tin cá nhân.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Bạn có thể đăng nhập vào tài khoản của mình và sử dụng tính năng tạo đơn hàng để đặt trà sữa một cách dễ dàng.'
);
manager.addAnswer(
  'vi',
  'AFFSS11K',
  'Điền đầy đủ thông tin cá nhân, bao gồm số điện thoại và địa chỉ, để booking phòng một cách nhanh chóng và thuận tiện nhất.'
);

//BFFSS2k mã định danh model cho câu hỏi 2
manager.addDocument('vi', 'Có bao nhiêu loại trà sữa phổ biến mà tôi có thể chọn?', 'BFFSS2k');
manager.addDocument('vi', 'Tôi có thể chọn từ mấy loại trà sữa phổ biến?', 'BFFSS2k');
manager.addDocument(
  'vi',
  'Có những loại trà sữa nào được coi là phổ biến và tôi có thể chọn?',
  'BFFSS2k'
);
manager.addDocument(
  'vi',
  'Tôi muốn biết về các loại phòng phổ biến mà tôi có thể chọn, có thể giúp tôi không?',
  'BFFSS2k'
);
manager.addDocument('vi', ' có những loại phòng nào là phổ biến và tôi có thể chọn?', 'BFFSS2k');
axios.get('http://localhost:3333/products').then((response) => {
  let AllProduct = "<span style='display:flex'>";
  for (let i = 0; i < response['data'].length; i++) {
    if (i == 5) break;
    let value = response['data'][i];
    AllProduct +=
      "<div style='width:100px;color:green;border:1px #ccc solid;margin:10px'>" +
      value.name +
      "<img style='width:100px;height:100px' src=" +
      value.images[0].url +
      '></div> ';
  }
  manager.addAnswer('vi', 'BFFSS2k', 'Shop có 5 phòng này phổ biến nè ' + AllProduct);
  manager.addAnswer('vi', 'BFFSS2k', 'Shop có mấy phòng này phổ biến này ' + AllProduct);
  manager.save();
  manager.train();
});

//CSSSS3K
manager.addDocument('vi', 'Làm thế nào để tôi thêm một loại trà sữa vào đơn hàng?', 'CSSSS3K');
manager.addDocument(
  'vi',
  'Tôi cần làm gì để thêm một loại trà sữa vào đơn hàng của mình?',
  'CSSSS3K'
);
manager.addDocument(
  'vi',
  'Làm thế nào để tôi có thể thêm một loại trà sữa vào đơn hàng tôi đang tạo?',
  'CSSSS3K'
);
manager.addDocument(
  'vi',
  'Có cách nào để tôi thêm một loại trà sữa vào đơn hàng không?',
  'CSSSS3K'
);
manager.addDocument(
  'vi',
  'Tôi cần phải làm gì để thêm một loại trà sữa vào đơn hàng tôi đang đặt?',
  'CSSSS3K'
);
manager.addDocument(
  'vi',
  'Bạn có thể cho tôi biết cách để thêm một loại trà sữa vào đơn hàng tôi đang tạo không?',
  'CSSSS3K'
);
//Ans
manager.addAnswer(
  'vi',
  'CSSSS3K',
  'Bạn có thể đăng nhập vào tài khoản và tạo đơn hàng hoặc điền đầy đủ thông tin bao gồm số điện thoại và địa chỉ để tạo nhanh chóng nhất.'
);
manager.addAnswer(
  'vi',
  'CSSSS3K',
  'Để tạo đơn hàng nhanh nhất, bạn có thể đăng nhập hoặc điền đầy đủ thông tin cá nhân, bao gồm số điện thoại và địa chỉ.'
);
manager.addAnswer(
  'vi',
  'CSSSS3K',
  'Để tạo đơn hàng một cách nhanh chóng, bạn có thể lựa chọn đăng nhập hoặc điền đầy đủ thông tin bao gồm số điện thoại và địa chỉ'
);
manager.addAnswer(
  'vi',
  'CSSSS3K',
  'Để tạo đơn hàng một cách thuận tiện và nhanh nhất, bạn có thể đăng nhập vào tài khoản hoặc điền đầy đủ thông tin cá nhân, bao gồm số điện thoại và địa chỉ.'
);
manager.addAnswer(
  'vi',
  'CSSSS3K',
  'Để tạo đơn hàng một cách hiệu quả và nhanh chóng, bạn có thể lựa chọn đăng nhập hoặc điền đầy đủ thông tin bao gồm số điện thoại và địa chỉ'
);

//DFSSS3k
manager.addDocument('vi', 'Làm thế nào để thêm topping vào đơn hàng trà sữa?', 'DFSSS3k');
manager.addDocument(
  'vi',
  'Có cách nào để tôi có thể thêm topping vào đơn hàng trà sữa không?',
  'DFSSS3k'
);
manager.addDocument('vi', 'Làm sao để tôi có thể bổ sung topping vào đơn hàng trà sữa?', 'DFSSS3k');
manager.addDocument(
  'vi',
  'Tôi muốn thêm topping vào đơn hàng trà sữa, có cách nào để làm điều đó không?',
  'DFSSS3k'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để tôi có thể đặt thêm topping vào đơn hàng trà sữa không?',
  'DFSSS3k'
);
manager.addDocument(
  'vi',
  'Làm thế nào để tôi có thể yêu cầu thêm topping vào đơn hàng trà sữa?',
  'DFSSS3k'
);
//Ans
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Toping bạn có thể tuỳ chọn bằng cách xem qua gian hàng của shop và lựa chọn loại phù hợp theo sở thích và giá tiền'
);
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Bạn có thể tùy chọn topping bằng cách xem qua danh sách sản phẩm của shop và chọn loại phù hợp với khẩu vị và giá cả'
);
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Để chọn topping, bạn có thể tham khảo danh sách sản phẩm của shop và lựa chọn loại phù hợp với sở thích và ngân sách của bạn.'
);
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Topping có thể được lựa chọn bằng cách xem qua các mục hàng của shop và chọn loại phù hợp với sở thích cá nhân và giá cả.'
);
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Bạn có thể tùy chọn topping bằng cách xem qua gian hàng của shop và chọn loại phù hợp với sở thích và ngân sách của bạn.'
);
manager.addAnswer(
  'vi',
  'DFSSS3K',
  'Để thêm topping, bạn có thể xem qua danh sách sản phẩm của shop và lựa chọn loại phù hợp với khẩu vị và giá tiền.'
);

//FFSS4F
manager.addDocument(
  'vi',
  'Có phí vận chuyển cho đơn hàng không? Nếu có, làm thế nào để tính phí vận chuyển?',
  'FFSS4F'
);
manager.addDocument(
  'vi',
  'Cho đơn hàng có tính phí vận chuyển không? Nếu có, làm thế nào để tính phí vận chuyển?',
  'FFSS4F'
);
manager.addDocument(
  'vi',
  'Đơn hàng có phải trả phí vận chuyển không? Nếu có, cách tính phí vận chuyển như thế nào?',
  'FFSS4F'
);
manager.addDocument(
  'vi',
  'Có mất phí vận chuyển cho đơn hàng không? Nếu có, làm sao để tính phí vận chuyển?',
  'FFSS4F'
);
manager.addDocument(
  'vi',
  'Đơn hàng có chi phí vận chuyển không? Nếu có, làm thế nào để tính toán phí vận chuyển?',
  'FFSS4F'
);
manager.addDocument(
  'vi',
  'Có phải trả phí vận chuyển cho đơn hàng không? Nếu có, cách tính phí vận chuyển ra sao?',
  'FFSS4F'
);
//Ans
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Dạ có phí vận chuyển nhé , phí sẽ tuỳ do thời gian đặt hàng , thời tiết và các yếu tố bên ship , phí sẽ dựa trên số Kilomet của quá trình vận chuyển.'
);
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Có phí vận chuyển, phụ thuộc vào thời gian đặt hàng, thời tiết và các yếu tố khác từ bên giao hàng, phí sẽ dựa trên số km di chuyển.'
);
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Vận chuyển có phí, phụ thuộc vào thời gian đặt hàng, thời tiết và các yếu tố từ bên vận chuyển, phí tính theo số km di chuyển.'
);
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Có phí vận chuyển, phụ thuộc vào thời gian đặt hàng, thời tiết và các yếu tố từ bên giao hàng, phí sẽ được tính dựa trên quãng đường vận chuyển.'
);
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Trong quá trình vận chuyển sẽ có phí, phụ thuộc vào thời gian đặt hàng, thời tiết và các yếu tố từ bên ship, phí sẽ được tính dựa trên số km di chuyển.'
);
manager.addAnswer(
  'vi',
  'FFSS4F',
  'Có phí vận chuyển, phụ thuộc vào thời gian đặt hàng, thời tiết và các yếu tố từ bên ship, phí sẽ được tính dựa trên quãng đường vận chuyển.'
);

//HFFSS4K
manager.addDocument('vi', 'Làm thế nào để chỉnh sửa một đơn hàng đã được đặt?', 'HFFSS4K');
//Ans
manager.addAnswer('vi', 'HFFSS4K', 'Rất tiếc hệ thống sẽ không cho chỉnh sửa đơn hàng');
manager.addAnswer(
  'vi',
  'HFFSS4K',
  'Hiện tại hệ thống sẽ không cho phép chỉnh sửa đơn hàng sau khi bạn đã đặt hàng ! Trân Trọng .'
);

//IFFSS5K
manager.addDocument('vi', 'Làm thế nào để xóa một sản phẩm khỏi đơn hàng?', 'IFFSS5K');
manager.addDocument('vi', 'Có cách nào để loại bỏ một sản phẩm khỏi đơn hàng không?', 'IFFSS5K');
manager.addDocument('vi', 'Làm sao để xoá đi một sản phẩm trong đơn hàng?', 'IFFSS5K');
manager.addDocument('vi', 'Có thể xóa một sản phẩm khỏi đơn hàng như thế nào?', 'IFFSS5K');
manager.addDocument('vi', 'Làm thế nào để bỏ đi một sản phẩm trong đơn hàng?', 'IFFSS5K');
manager.addDocument('vi', 'Có cách nào để xoá bỏ một sản phẩm trong đơn hàng không?', 'IFFSS5K');

//Ans
manager.addAnswer('vi', 'IFFSS5K', 'bạn có thể xoá bằng cách vào đơn hàng của tôi và chọn xoá');
manager.addAnswer(
  'vi',
  'IFFSS5K',
  'Bạn có thể xoá sản phẩm bằng cách truy cập vào đơn hàng của bạn và chọn tùy chọn xoá.'
);
manager.addAnswer(
  'vi',
  'IFFSS5K',
  'Để xoá một sản phẩm, bạn có thể vào đơn hàng của mình và chọn lựa chọn xoá.'
);
manager.addAnswer(
  'vi',
  'IFFSS5K',
  'Việc xoá một sản phẩm khỏi đơn hàng có thể được thực hiện bằng cách vào đơn hàng và chọn xoá.'
);
manager.addAnswer(
  'vi',
  'IFFSS5K',
  'Để xoá một sản phẩm, hãy truy cập vào đơn hàng của bạn và lựa chọn xoá.'
);
manager.addAnswer(
  'vi',
  'IFFSS5K',
  'Bạn có thể xoá một sản phẩm bằng cách vào đơn hàng của bạn và chọn tùy chọn xoá đi.'
);

//JHFSS6K
manager.addDocument('vi', 'Làm thế nào để xác nhận đơn hàng và thực hiện thanh toán?', 'JHFSS6K');
manager.addDocument('vi', 'Làm sao để xác nhận đơn hàng và thanh toán?', 'JHFSS6K');
manager.addDocument('vi', 'Có cách nào để xác nhận và thanh toán đơn hàng không?', 'JHFSS6K');
manager.addDocument(
  'vi',
  'Làm thế nào để xác nhận và tiến hành thanh toán cho đơn hàng?',
  'JHFSS6K'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để xác nhận và thanh toán đơn hàng không?',
  'JHFSS6K'
);
manager.addDocument(
  'vi',
  'Làm thế nào để xác nhận và thực hiện thanh toán cho đơn hàng của tôi?',
  'JHFSS6K'
);

//Ans
manager.addAnswer('vi', 'JHFSS6K', 'Bạn có thể xác nhận đơn hàng .');
manager.addAnswer('vi', 'JHFSS6K', 'Bạn có thể thực hiện việc xác nhận đơn hàng.');
manager.addAnswer('vi', 'JHFSS6K', 'Việc xác nhận đơn hàng có sẽ bao gồm thực hiện thanh toán.');

//KFFSS7O_
manager.addDocument(
  'vi',
  'Làm thế nào để theo dõi tình trạng giao hàng của một đơn hàng?',
  'KFFSS7O_'
);
manager.addDocument('vi', 'Làm sao để kiểm tra tình trạng giao hàng của một đơn hàng?', 'KFFSS7O_');
manager.addDocument(
  'vi',
  'Có cách nào để theo dõi tình trạng giao hàng của một đơn hàng không?',
  'KFFSS7O_'
);
manager.addDocument(
  'vi',
  'Làm thế nào để biết được tình trạng giao hàng của một đơn hàng?',
  'KFFSS7O_'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để xem tình trạng giao hàng của một đơn hàng không?',
  'KFFSS7O_'
);
manager.addDocument(
  'vi',
  'Làm thế nào để tra cứu tình trạng giao hàng của một đơn hàng?',
  'KFFSS7O_'
);
//Ans
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Bạn có thể vào đơn hàng của tôi để xem tình trạng và chi tiết đơn hàng hoặc điền ID đơn hàng tại đây Chatbot sẽ đưa ra thông tin đơn hàng chính xác'
);
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Bạn có thể truy cập vào đơn hàng của bạn để kiểm tra tình trạng và chi tiết đơn hàng. Hoặc có thể nhập ID đơn hàng tại đây và Chatbot sẽ cung cấp thông tin đơn hàng chính xác.'
);
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Vào đơn hàng của bạn để xem tình trạng và chi tiết đơn hàng. Hoặc nhập ID đơn hàng tại đây và Chatbot sẽ cung cấp thông tin đơn hàng chính xác.'
);
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Để xem tình trạng và chi tiết đơn hàng, hãy truy cập vào đơn hàng của bạn hoặc điền ID đơn hàng tại đây. Chatbot sẽ cung cấp thông tin đơn hàng chính xác.'
);
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Điều bạn cần làm là vào đơn hàng của bạn để kiểm tra tình trạng và chi tiết đơn hàng. Hoặc nhập ID đơn hàng tại đây và Chatbot sẽ đưa ra thông tin đơn hàng chính xác.'
);
manager.addAnswer(
  'vi',
  'KFFSS7O_',
  'Để xem tình trạng và chi tiết đơn hàng, hãy vào đơn hàng của bạn hoặc điền ID đơn hàng tại đây. Chatbot sẽ cung cấp thông tin đơn hàng chính xác.'
);

//LFFSS8K
manager.addDocument(
  'vi',
  'Làm thế nào để kiểm tra tồn kho các loại trà sữa và topping?',
  'LFFSS8K'
);
//Ans
manager.addAnswer('vi', 'LFFSS8K', '[Null]');
//=> WRONG ANSWER :=>error [Answer Not Null]

//MFFSS9K
manager.addDocument(
  'vi',
  'Bạn có hệ thống ưu đãi hoặc phiếu giảm giá không? Làm thế nào để áp dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
manager.addDocument(
  'vi',
  'Có chương trình ưu đãi hoặc phiếu giảm giá không? Làm thế nào để sử dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
manager.addDocument(
  'vi',
  'Có khuyến mãi hoặc phiếu giảm giá không? Làm sao để áp dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
manager.addDocument(
  'vi',
  'Có ưu đãi đặc biệt hoặc phiếu giảm giá không? Làm thế nào để áp dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
manager.addDocument(
  'vi',
  'Có chính sách ưu đãi hoặc phiếu giảm giá không? Làm cách nào để sử dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
manager.addDocument(
  'vi',
  'Có chương trình khuyến mãi hoặc phiếu giảm giá không? Làm thế nào để áp dụng chúng cho đơn hàng?',
  'MFFSS9K'
);
//Ans
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'shop có rất nhiều ưu đãi và vouche khác nhau , sẽ phát rất nhiều vào các dịp lễ và tri ân khách hàng'
);
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'Có, chúng tôi có rất nhiều ưu đãi và voucher khác nhau trong cửa hàng. Chúng tôi thường phát hành chúng vào các dịp lễ và để tri ân khách hàng.'
);
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'Chúng tôi có một loạt các ưu đãi và voucher khác nhau trong cửa hàng. Chúng tôi thường cung cấp chúng vào các dịp lễ và để tri ân khách hàng.'
);
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'Cửa hàng của chúng tôi có nhiều ưu đãi và voucher khác nhau. Chúng tôi thường phát hành chúng vào các dịp lễ và để tri ân khách hàng.'
);
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'Chúng tôi cung cấp rất nhiều ưu đãi và voucher khác nhau trong cửa hàng. Chúng tôi thường phát hành chúng vào các dịp lễ và để tri ân khách hàng.'
);
manager.addAnswer(
  'vi',
  'MFFSS9K',
  'Cửa hàng của chúng tôi có rất nhiều ưu đãi và voucher khác nhau. Chúng tôi thường phát hành chúng vào các dịp lễ và để tri ân khách hàng.'
);

//NFFSS10K
manager.addDocument(
  'vi',
  'Làm thế nào để đặt hàng nhanh cho các sản phẩm trà sữa phổ biến mà khách hàng thường chọn?',
  'NFFSS10K'
);
manager.addDocument(
  'vi',
  'Cách nhanh nhất để đặt hàng các sản phẩm trà sữa phổ biến mà khách hàng thường chọn là gì?',
  'NFFSS10K'
);
manager.addDocument(
  'vi',
  'Bạn có thể chỉ cho tôi các phương pháp đặt hàng nhanh cho các sản phẩm trà sữa phổ biến mà khách hàng thường chọn không?',
  'NFFSS10K'
);
manager.addDocument(
  'vi',
  'Làm sao để đặt hàng nhanh các sản phẩm trà sữa phổ biến mà khách hàng thường chọn?',
  'NFFSS10K'
);
manager.addDocument(
  'vi',
  'Có những cách nào để đặt hàng nhanh cho các loại trà sữa phổ biến mà khách hàng thường chọn không?',
  'NFFSS10K'
);
manager.addDocument(
  'vi',
  'Bạn có thể cho tôi biết cách đặt hàng nhanh cho các sản phẩm trà sữa phổ biến mà khách hàng thường chọn được không?',
  'NFFSS10K'
);

//Ans
manager.addAnswer(
  'vi',
  'NFFSS10K',
  'sản phẩm nổi bật và sản phẩm phổ biến sẽ được hiển thị ở ngay trang chính'
);
//=> WRONG ANSWER :=>error [Answer Not Similar]

//OFFSS11K
manager.addDocument(
  'vi',
  'Có thể tạo danh sách ưa thích của khách hàng để đặt hàng nhanh hơn không?',
  'OFFSS11K'
);
//Ans
manager.addAnswer('vi', 'OFFSS11K', '[Null]');
//=> WRONG ANSWER :=>error [Answer Not Null]

//PFFSS12K
manager.addDocument(
  'vi',
  'Làm thế nào để tính toán tổng giá trị của đơn hàng với tất cả các món đã chọn?',
  'PFFSS12K'
);
//Ans
manager.addAnswer('vi', 'PFFSS12K', '[Null]');
//=> WRONG ANSWER :=>error [Answer Not Null]

//UFSS13K
manager.addDocument(
  'vi',
  'Làm thế nào để thực hiện theo dõi lịch sử đặt hàng của một khách hàng?',
  'UFSS13K'
);
manager.addDocument(
  'vi',
  'Có cách nào để theo dõi lịch sử đặt hàng của một khách hàng không?',
  'UFSS13K'
);
manager.addDocument('vi', 'Làm sao để kiểm tra lịch sử đặt hàng của một khách hàng?', 'UFSS13K');
manager.addDocument(
  'vi',
  'Có phương pháp nào để xem thông tin về các đơn hàng trước đây của một khách hàng không?',
  'UFSS13K'
);
manager.addDocument('vi', 'Làm thế nào để tra cứu lịch sử đặt hàng của một khách hàng?', 'UFSS13K');
manager.addDocument(
  'vi',
  'Bạn có thể chỉ cho tôi cách xem lịch sử đặt hàng của một khách hàng được không?',
  'UFSS13K'
);

//Ans
manager.addAnswer('vi', 'UFSS13K', 'bạn có thể vào phần lịch sử đơn hàng để theo dõi nha');
manager.addAnswer('vi', 'UFSS13K', 'Bạn có thể kiểm tra lịch sử đơn hàng để theo dõi đấy.');
manager.addAnswer(
  'vi',
  'UFSS13K',
  'Vào phần lịch sử đơn hàng để xem thông tin chi tiết về các đơn hàng trước đây.'
);
manager.addAnswer('vi', 'UFSS13K', 'Để theo dõi, bạn có thể truy cập vào phần lịch sử đơn hàng.');
manager.addAnswer('vi', 'UFSS13K', 'Để biết thêm, bạn có thể xem lịch sử đơn hàng để theo dõi.');
manager.addAnswer(
  'vi',
  'UFSS13K',
  'Hãy vào phần lịch sử đơn hàng để xem thông tin về các đơn hàng đã được đặt.'
);

//SRHSS14K
manager.addDocument(
  'vi',
  'Có cách nào để xử lý việc trả lại hoặc hoàn tiền cho một đơn hàng?',
  'SRHSS14K'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để xử lý việc trả lại hoặc hoàn tiền cho một đơn hàng không?',
  'SRHSS14K'
);
manager.addDocument(
  'vi',
  'Làm thế nào để giải quyết việc trả lại hoặc hoàn tiền cho một đơn hàng?',
  'SRHSS14K'
);
manager.addDocument(
  'vi',
  'Có cách nào để xử lý việc trả lại hoặc nhận hoàn tiền cho một đơn hàng không?',
  'SRHSS14K'
);
manager.addDocument(
  'vi',
  'Bạn có thể chỉ cho tôi cách xử lý việc trả lại hoặc hoàn tiền cho một đơn hàng được không?',
  'SRHSS14K'
);
manager.addDocument(
  'vi',
  'Làm sao để xử lý việc trả lại hoặc yêu cầu hoàn tiền cho một đơn hàng?',
  'SRHSS14K'
);

//Ans
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'nếu như gặp sự cố liên quan đến đơn hàng , bạn hãy tạo ticket chat để được các nhân viên hỗ trợ nhanh nhất nhé'
);
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'fffNếu bạn gặp bất kỳ vấn đề nào liên quan đến đơn hàng, hãy tạo một ticket chat để được hỗ trợ từ các nhân viên ngay lập tức.fff'
);
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'Để giải quyết các vấn đề liên quan đến đơn hàng, bạn có thể tạo một ticket chat để được hỗ trợ từ đội ngũ nhân viên chuyên nghiệp.'
);
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'Trong trường hợp xảy ra sự cố với đơn hàng, hãy tạo một ticket chat để được hỗ trợ nhanh chóng từ các nhân viên.'
);
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'Nếu bạn gặp vấn đề với đơn hàng, hãy tạo một ticket chat để được các nhân viên hỗ trợ ngay lập tức.'
);
manager.addAnswer(
  'vi',
  'SRHSS14K',
  'Để xử lý các vấn đề liên quan đến đơn hàng, bạn có thể tạo một ticket chat để nhận được sự hỗ trợ nhanh nhất từ đội ngũ nhân viên.'
);

//RFHSS15K
manager.addDocument(
  'vi',
  'Làm thế nào để gửi xác nhận đặt hàng và thông tin liên lạc đến khách hàng qua email hoặc tin nhắn văn bản?',
  'RFHSS15K'
);
//Ans
manager.addAnswer('vi', 'RFHSS15K', '[Null]');
//=> WRONG ANSWER :=>error [Answer Not Null]

//TRHSS16K
manager.addDocument(
  'vi',
  'Bạn cung cấp dịch vụ giao hàng tận nơi không? Làm thế nào để xác định thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
manager.addDocument(
  'vi',
  'Có cung cấp dịch vụ giao hàng tận nơi không? Làm sao để biết thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
manager.addDocument(
  'vi',
  'Bạn có dịch vụ giao hàng tận nơi không? Làm thế nào để xác định thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
manager.addDocument(
  'vi',
  'Dịch vụ giao hàng tận nơi có được cung cấp không? Làm cách nào để xác định thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
manager.addDocument(
  'vi',
  'Có hỗ trợ giao hàng tận nơi không? Làm thế nào để biết thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
manager.addDocument(
  'vi',
  'Bạn có dịch vụ giao hàng đến tận nơi không? Làm sao để xác định thời gian giao hàng dự kiến?',
  'TRHSS16K'
);
//Ans
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'shop có dịch vụ giao hàng tận nơi , và thời gian giao hàng phụ thuộc nhiều yếu tố bao gồm quãng đường , thời tiết ......'
);
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'Chúng tôi có cung cấp dịch vụ giao hàng tận nơi. Để xác định thời gian giao hàng dự kiến, bạn có thể làm như sau: Kiểm tra thông tin về thời gian giao hàng dự kiến trên trang web của chúng tôi. Liên hệ với chúng tôi qua số điện thoại hoặc chat trực tuyến để được tư vấn về thời gian giao hàng dự kiến.'
);
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'húng tôi đảm bảo dịch vụ giao hàng tận nơi. Để biết thời gian giao hàng dự kiến, bạn có thể thực hiện các bước sau: Truy cập vào trang web của chúng tôi và tìm thông tin về thời gian giao hàng dự kiến. Liên hệ với chúng tôi qua số điện thoại hoặc email để được hỗ trợ và xác định thời gian giao hàng dự kiến.'
);
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'Chúng tôi có dịch vụ giao hàng tận nơi. Để xác định thời gian giao hàng dự kiến, bạn có thể tham khảo các phương pháp sau: Kiểm tra thông tin về thời gian giao hàng dự kiến trên trang web hoặc ứng dụng của chúng tôi. Liên hệ với chúng tôi qua số điện thoại hoặc chat trực tuyến để được tư vấn về thời gian giao hàng dự kiến.'
);
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'Chúng tôi cung cấp dịch vụ giao hàng tận nơi. Để biết thời gian giao hàng dự kiến, bạn có thể làm như sau: Truy cập vào trang web hoặc ứng dụng của chúng tôi để tìm thông tin về thời gian giao hàng dự kiến. Liên hệ với chúng tôi qua số điện thoại hoặc email để được hỗ trợ và xác định thời gian giao hàng dự kiến.'
);
manager.addAnswer(
  'vi',
  'TRHSS16K',
  'Chúng tôi sẵn lòng cung cấp dịch vụ giao hàng tận nơi. Để xác định thời gian giao hàng dự kiến, bạn có thể thực hiện các bước sau: Kiểm tra thông tin về thời gian giao hàng dự kiến trên trang web hoặc ứng dụng của chúng tôi. Liên hệ với chúng tôi qua số điện thoại hoặc chat trực tuyến để được tư vấn về thời gian giao hàng dự kiến.'
);

//URHSS17K
manager.addDocument(
  'vi',
  'Làm thế nào để quản lý các đơn hàng đang chờ xử lý và đơn hàng đã hoàn thành trong hệ thống?',
  'URHSS17K'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSS17K',
  'hiện tại tại của hàng<br>1. đối với đơn hàng đang chờ xử lý: mỗi khi khách hàng đặt hàng, đơn hàng mới sẽ tự động xuất hiện trong danh sách đang chờ và nhân viên của chúng <br>tôi kiểm tra danh sách này định kỳ và xử lý từng đơn hàng theo thứ tự đặt hàng.<br>2. đối với đơn đã hoàn thành: chúng tôi cập nhật trạng thái của đơn hàng đó trong hệ thống của chúng tôi từ "Đang xử lý" sang "Đã hoàn thành" <br>đảm bảo rằng chúng tôi sẽ không giao cùng một đơn hàng cho khách hàng hai lần.'
);
//=> WRONG ANSWER :=>error [Answer Not Null]

//URHSH18K
manager.addDocument('vi', 'Làm sao để chọn các loại trà sữa và topping?', 'URHSH18K');
manager.addDocument(
  'vi',
  'Làm thế nào để biết được loại trà sữa và topping nào là phổ biến và được ưa chuộng nhất?',
  'URHSH18K'
);
manager.addDocument(
  'vi',
  'Bạn có thể cho tôi biết thêm về quy trình chọn trà sữa và topping ở cửa hàng của bạn không?',
  'URHSH18K'
);
manager.addDocument(
  'vi',
  'Có những nguyên tắc nào cần tuân thủ khi chọn trà sữa và topping?',
  'URHSH18K'
);
manager.addDocument(
  'vi',
  'Bạn có gợi ý nào để chọn trà sữa và topping phù hợp với sở thích của mình không?',
  'URHSH18K'
);

//Ans
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Trên trang web, bạn thường sẽ thấy menu hiển thị các loại trà sữa và topping. <br>Bạn có thể chọn các tùy chọn yêu thích của mình và thêm chúng vào giỏ hàng.'
);
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Trên trang web, bạn sẽ thấy danh sách các loại trà sữa và topping để bạn lựa chọn. Bạn có thể chọn những loại mà bạn thích và thêm vào giỏ hàng.'
);
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Khi bạn truy cập vào trang web, bạn sẽ thấy danh sách các loại trà sữa và topping. Bạn chỉ cần chọn những loại mà bạn muốn và thêm vào giỏ hàng.'
);
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Trên trang web, có menu hiển thị các loại trà sữa và topping. Bạn có thể lựa chọn những loại mà bạn thích và thêm vào giỏ hàng của mình.'
);
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Nếu bạn vào trang web, bạn sẽ thấy danh sách các loại trà sữa và topping. Bạn chỉ cần chọn những loại mà bạn muốn và thêm vào giỏ hàng để đặt hàng.'
);
manager.addAnswer(
  'vi',
  'URHSH18K',
  'Khi bạn truy cập vào trang web, bạn sẽ thấy danh sách các loại trà sữa và topping. Bạn có thể lựa chọn những loại mà bạn thích và thêm vào giỏ hàng để mua hàng.'
);

//URHSH19G
manager.addDocument('vi', 'Làm sao để thay đổi kích cỡ và đường của trà sữa?', 'URHSH19G');
manager.addDocument(
  'vi',
  'Có những cách nào để điều chỉnh kích cỡ và đường của trà sữa không?',
  'URHSH19G'
);
manager.addDocument('vi', 'Làm thế nào để tùy chỉnh kích cỡ và đường của trà sữa?', 'URHSH19G');
manager.addDocument(
  'vi',
  'Có những phương pháp nào để điều chỉnh kích cỡ và đường của trà sữa?',
  'URHSH19G'
);
manager.addDocument(
  'vi',
  'Bạn có thể giúp tôi biết cách thay đổi kích cỡ và đường của trà sữa không?',
  'URHSH19G'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Thông thường, bạn có thể chọn kích cỡ và lượng đường trong quá trình đặt hàng trực tuyến. Sẽ có tùy chọn để tùy chỉnh đặc điểm này.'
);
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Thông thường, khi bạn đặt hàng trực tuyến, bạn có thể lựa chọn kích cỡ và lượng đường theo ý muốn của mình.'
);
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Khi mua trà sữa trực tuyến, bạn sẽ có thể tuỳ chỉnh kích cỡ và đường cho đúng với sở thích của mình.'
);
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Trong quá trình đặt hàng trực tuyến, bạn có thể tùy chỉnh kích cỡ và đường của trà sữa theo mong muốn của mình.'
);
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Khi đặt mua trà sữa trực tuyến, bạn sẽ có tùy chọn để điều chỉnh kích cỡ và đường theo ý muốn cá nhân.'
);
manager.addAnswer(
  'vi',
  'URHSH19G',
  'Thông thường, khi mua trà sữa qua mạng, bạn có thể thay đổi kích cỡ và đường để phù hợp với sở thích của mình.'
);

//URHSH20G
manager.addDocument('vi', 'Làm cách nào để xem giỏ hàng của tôi trước khi thanh toán?', 'URHSH20G');
manager.addDocument('vi', 'Làm thế nào để kiểm tra giỏ hàng trước khi thanh toán?', 'URHSH20G');
manager.addDocument(
  'vi',
  'Có cách nào để xem lại giỏ hàng trước khi tiến hành thanh toán không?',
  'URHSH20G'
);
manager.addDocument(
  'vi',
  'Làm sao để xem các sản phẩm đã chọn trong giỏ hàng trước khi thanh toán?',
  'URHSH20G'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để kiểm tra lại các mặt hàng trong giỏ hàng trước khi hoàn tất thanh toán không?',
  'URHSH20G'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Trên trang web, Khi bạn đã chọn được trà sữa yêu thích của mình và nhấn nút "Thêm  giỏ hàng",  ngay lập tức các sản phẩm bạn chọn sẽ xuất hiện ở giỏ hàng phía bên phải màn hình .Bạn có thể nhấp vào đó để xem các sản phẩm đã chọn và điều chỉnh chúng trước khi thanh toán.'
);
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Sau khi bạn thêm trà sữa yêu thích vào giỏ hàng, các sản phẩm sẽ tự động hiển thị trong giỏ hàng phía bên phải màn hình. Bạn có thể nhấp vào giỏ hàng để xem và chỉnh sửa các sản phẩm trước khi tiến hành thanh toán.'
);
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Khi bạn nhấn nút "Thêm giỏ hàng" sau khi chọn trà sữa yêu thích, các sản phẩm sẽ ngay lập tức xuất hiện trong giỏ hàng ở phía bên phải màn hình. Bạn có thể xem và điều chỉnh các sản phẩm trong giỏ hàng trước khi tiến hành thanh toán.'
);
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Ngay sau khi bạn chọn trà sữa yêu thích và nhấn nút "Thêm giỏ hàng", các sản phẩm sẽ hiển thị trong giỏ hàng phía bên phải màn hình. Bạn có thể nhấp vào giỏ hàng để kiểm tra và điều chỉnh các sản phẩm trước khi thanh toán.'
);
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Khi bạn thêm trà sữa yêu thích vào giỏ hàng bằng cách nhấn nút "Thêm giỏ hàng", các sản phẩm sẽ tức thì xuất hiện trong giỏ hàng phía bên phải màn hình. Bạn có thể xem và chỉnh sửa các sản phẩm trong giỏ hàng trước khi tiến hành thanh toán.'
);
manager.addAnswer(
  'vi',
  'URHSH20G',
  'Sau khi bạn chọn trà sữa yêu thích và nhấn nút "Thêm giỏ hàng", các sản phẩm sẽ ngay lập tức xuất hiện trong giỏ hàng phía bên phải màn hình. Bạn có thể nhấp vào giỏ hàng để xem và điều chỉnh các sản phẩm trước khi tiến hành thanh toán.'
);

//URHSH21G
manager.addDocument('vi', 'Tôi có thể thêm ghi chú  cho đơn hàng của mình không?', 'URHSH21G');
manager.addDocument('vi', 'Tôi có thể thêm ghi chú cho đơn hàng của mình không?', 'URHSH21G');
manager.addDocument('vi', 'Có cách nào để đặt ghi chú cho đơn hàng của tôi không?', 'URHSH21G');
manager.addDocument('vi', 'Làm sao để ghi chú cho đơn hàng của tôi?', 'URHSH21G');
manager.addDocument(
  'vi',
  'Tôi có thể điền thông tin ghi chú vào đơn hàng của mình không?',
  'URHSH21G'
);
manager.addDocument(
  'vi',
  'Có phương pháp nào để thêm ghi chú cho đơn hàng trước khi thanh toán không?',
  'URHSH21G'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Thường, bạn có thể thêm ghi chú cho đơn hàng trong quá trình đặt mua. Cung cấp thông tin chi tiết giúp cửa hàng làm đúng theo yêu cầu của bạn'
);
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Thường thì bạn có thể thêm ghi chú cho đơn hàng trong quá trình đặt mua. Hãy cung cấp thông tin chi tiết để cửa hàng có thể đáp ứng yêu cầu của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Trong quá trình đặt mua, bạn có thể thêm ghi chú cho đơn hàng của mình. Hãy cung cấp thông tin chi tiết để cửa hàng có thể hiểu rõ yêu cầu của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Thường thì bạn có thể gửi ghi chú cho đơn hàng trong quá trình đặt mua. Hãy cung cấp thông tin chi tiết để cửa hàng có thể tuân thủ yêu cầu của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Trong quá trình đặt mua, bạn có thể đính kèm ghi chú cho đơn hàng của mình. Hãy cung cấp thông tin chi tiết để cửa hàng có thể thực hiện đúng theo yêu cầu của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH21G',
  'Thường thì bạn có thể yêu cầu thêm ghi chú cho đơn hàng trong quá trình đặt mua. Hãy cung cấp thông tin chi tiết để cửa hàng có thể làm đúng theo yêu cầu của bạn.'
);

//URHSH22J
manager.addDocument('vi', 'Làm sao để thanh toán trực tuyến?', 'URHSH22J');
manager.addDocument('vi', 'Có cách nào để thanh toán qua mạng không?', 'URHSH22J');
manager.addDocument('vi', 'Làm sao để thực hiện thanh toán online?', 'URHSH22J');
manager.addDocument('vi', 'Có phương pháp nào để thanh toán trực tuyến không?', 'URHSH22J');
manager.addDocument('vi', 'Tôi có thể thanh toán qua internet như thế nào?', 'URHSH22J');
//Ans
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Trang web hiện tại chấp nhận thanh toán qua cổng thanh toán trực tuyến VNPay'
);
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Trang web hiện tại cho phép thanh toán qua cổng thanh toán trực tuyến VNPay.'
);
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Bạn có thể sử dụng cổng thanh toán trực tuyến VNPay để thanh toán trên trang web này'
);
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Cổng thanh toán trực tuyến VNPay được chấp nhận để thanh toán trên trang web này.'
);
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Trang web này hỗ trợ thanh toán qua cổng thanh toán trực tuyến VNPay.'
);
manager.addAnswer(
  'vi',
  'URHSH22J',
  'Bạn có thể sử dụng VNPay để thanh toán trực tuyến trên trang web này.'
);

//URHSH23D
manager.addDocument(
  'vi',
  'Tôi sẽ nhận được xác nhận đơn hàng sau khi hoàn tất thanh toán không?',
  'URHSH23D'
);
manager.addDocument(
  'vi',
  'Sau khi tôi hoàn tất thanh toán, liệu tôi có nhận được xác nhận đơn hàng không?',
  'URHSH23D'
);
manager.addDocument(
  'vi',
  'Nếu tôi đã thanh toán thành công, tôi có được xác nhận đơn hàng không?',
  'URHSH23D'
);
manager.addDocument(
  'vi',
  'Sau khi tôi thanh toán, liệu tôi sẽ nhận được xác nhận đơn hàng không?',
  'URHSH23D'
);
manager.addDocument(
  'vi',
  'Tôi đã hoàn tất thanh toán, vậy tôi có nhận được xác nhận đơn hàng không?',
  'URHSH23D'
);
manager.addDocument(
  'vi',
  'Sau khi tôi thanh toán, liệu tôi sẽ nhận được thông báo xác nhận đơn hàng không?',
  'URHSH23D'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSH23D',
  'Về thường, sau khi hoàn tất thanh toán, bạn sẽ nhận được email xác nhận đơn hàng với thông tin chi tiết về đơn hàng của bạn'
);
manager.addAnswer(
  'vi',
  'URHSH23D',
  'Thường thì sau khi hoàn tất thanh toán, bạn sẽ nhận được email xác nhận đơn hàng chứa thông tin chi tiết về đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH23D',
  'Thông thường, sau khi hoàn tất thanh toán, hệ thống sẽ tự động gửi cho bạn một email xác nhận đơn hàng chứa thông tin chi tiết về đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH23D',
  'Sau khi bạn hoàn tất thanh toán, thông thường bạn sẽ nhận được một email xác nhận đơn hàng có chứa thông tin chi tiết về đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'URHSH23D',
  'Thường thì sau khi thanh toán thành công, bạn sẽ nhận được một email xác nhận đơn hàng với thông tin chi tiết về đơn hàng của bạn.'
);

//URHSH24D
manager.addDocument(
  'vi',
  'Tôi sẽ nhận được xác nhận đơn hàng sau khi hoàn tất thanh toán không?',
  'URHSH24D'
);
manager.addDocument(
  'vi',
  'Tôi có thể kiểm tra tình trạng giao hàng của đơn hàng của mình như thế nào?',
  'URHSH24D'
);
manager.addDocument('vi', 'Làm sao để xem tình trạng giao hàng của đơn hàng của tôi?', 'URHSH24D');
manager.addDocument(
  'vi',
  'Có cách nào để biết được tình trạng giao hàng của đơn hàng của tôi không?',
  'URHSH24D'
);
manager.addDocument(
  'vi',
  'Tôi có thể tra cứu tình trạng giao hàng của đơn hàng của mình như thế nào?',
  'URHSH24D'
);
manager.addDocument(
  'vi',
  'Làm thế nào để kiểm tra xem đơn hàng của tôi đã được giao hay chưa?',
  'URHSH24D'
);
//Ans
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Bạn có thể theo dõi tình trạng giao hàng thông qua email xác nhận đơn hàng hoặc trang web cửa hàng. Thường có thông tin cập nhật về việc giao hàng'
);
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Bạn có thể kiểm tra tình trạng giao hàng bằng cách kiểm tra email xác nhận đơn hàng hoặc truy cập vào trang web của cửa hàng. Thông tin về việc giao hàng thường được cập nhật đều đặn trên hai nền tảng này.'
);
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Để biết tình trạng giao hàng, bạn có thể xem email xác nhận đơn hàng hoặc truy cập vào trang web của cửa hàng. Thông tin về việc giao hàng sẽ được cập nhật thường xuyên trên hai nền tảng này'
);
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Cách để bạn biết tình trạng giao hàng là thông qua email xác nhận đơn hàng hoặc trang web của cửa hàng. Thường có thông tin mới nhất về việc giao hàng trên hai nền tảng này.'
);
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Để xem tình trạng giao hàng, bạn có thể kiểm tra email xác nhận đơn hàng hoặc truy cập vào trang web của cửa hàng. Thông tin cập nhật về việc giao hàng sẽ được cung cấp trên hai nền tảng này.'
);
manager.addAnswer(
  'vi',
  'URHSH24D',
  'Bạn có thể theo dõi tình trạng giao hàng qua email xác nhận đơn hàng hoặc trang web của cửa hàng. Thông tin về việc giao hàng sẽ được cập nhật đều đặn trên hai nền tảng này.'
);

//FHSH25FB
manager.addDocument('vi', 'Tôi có thể hủy đơn hàng sau khi đã đặt mua không?', 'FHSH25FB');
manager.addDocument('vi', 'Tôi có thể hủy đơn hàng sau khi đã đặt mua được không?', 'FHSH25FB');
manager.addDocument('vi', 'Có thể hủy đơn hàng sau khi đã đặt mua không?', 'FHSH25FB');
manager.addDocument('vi', 'Sau khi đã đặt mua, tôi có thể hủy đơn hàng không?', 'FHSH25FB');
manager.addDocument('vi', 'Hủy đơn hàng có được chấp nhận sau khi đã đặt mua không?', 'FHSH25FB');
manager.addDocument('vi', 'Sau khi đã đặt mua, có thể tôi hủy đơn hàng không?', 'FHSH25FB');
//Ans
manager.addAnswer(
  'vi',
  'FHSH25FB',
  'Đơn hàng của bạn đang trong trạng thái "Chờ xác nhận", vì vậy việc hủy đơn hàng có thể khó khăn. Hãy xem xét kỹ trước khi đặt hàng.'
);
manager.addAnswer(
  'vi',
  'FHSH25FB',
  'Trong trường hợp đơn hàng của bạn đang chờ xác nhận, việc hủy đơn hàng có thể gặp khó khăn. Vì vậy, hãy xem xét kỹ trước khi tiến hành đặt hàng.'
);
manager.addAnswer(
  'vi',
  'FHSH25FB',
  'Khi đơn hàng của bạn đang trong trạng thái "Chờ xác nhận", việc hủy đơn hàng có thể không đơn giản. Hãy xem xét kỹ trước khi quyết định đặt hàng.'
);
manager.addAnswer(
  'vi',
  'FHSH25FB',
  'Nếu đơn hàng của bạn vẫn đang chờ xác nhận, việc hủy đơn hàng có thể không dễ dàng. Vì vậy, hãy suy nghĩ cẩn thận trước khi đặt mua.'
);
manager.addAnswer(
  'vi',
  'FHSH25FB',
  'Trong trường hợp đơn hàng của bạn đang trong trạng thái "Chờ xác nhận", việc hủy đơn hàng có thể gặp khó khăn. Vì thế, hãy xem xét kỹ trước khi thực hiện đặt hàng'
);

//FHSH26FB
manager.addDocument(
  'vi',
  'Tôi có thể đặt mua trà sữa hàng ngày thông qua trang web không?',
  'FHSH26FB'
);
manager.addDocument('vi', 'Trang web có cho phép đặt mua trà sữa hàng ngày không?', 'FHSH26FB');
manager.addDocument('vi', 'Có thể mua trà sữa hàng ngày qua trang web được không?', 'FHSH26FB');
manager.addDocument('vi', 'Trang web có dịch vụ đặt mua trà sữa hàng ngày không?', 'FHSH26FB');
manager.addDocument(
  'vi',
  'Có cách nào để đặt mua trà sữa hàng ngày qua trang web không?',
  'FHSH26FB'
);
manager.addDocument(
  'vi',
  'Tôi có thể đặt mua trà sữa hàng ngày trên trang web được không?',
  'FHSH26FB'
);
//Ans
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Đúng vậy! Bạn hoàn toàn có thể đặt mua trà sữa hàng ngày trên trang web của chúng tôi.'
);
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Tất nhiên! Trên hệ thống trang web của chúng tôi, bạn có thể đặt mua trà sữa hàng ngày.'
);
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Chắc chắn! Hệ thống trang web của chúng tôi cho phép bạn đặt mua trà sữa hàng ngày.'
);
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Đương nhiên! Bạn có thể thoải mái đặt mua trà sữa hàng ngày trên trang web của chúng tôi.'
);
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Dĩ nhiên! Chúng tôi cung cấp dịch vụ đặt mua trà sữa hàng ngày trên trang web của mình.'
);
manager.addAnswer(
  'vi',
  'FHSH26FB',
  'Chắc chắn rồi! Bạn có thể đặt mua trà sữa hàng ngày trên hệ thống trang web của chúng tôi ^^'
);

//FHSH27CB
manager.addDocument(
  'vi',
  'Tôi có thể sử dụng thẻ giảm giá khi đặt mua trà sữa trực tuyến không?',
  'FHSH27CB'
);
manager.addDocument(
  'vi',
  'Tôi có thể áp dụng thẻ giảm giá khi đặt mua trà sữa trực tuyến không?',
  'FHSH27CB'
);
manager.addDocument(
  'vi',
  'Có chấp nhận thẻ giảm giá khi đặt mua trà sữa trực tuyến không?',
  'FHSH27CB'
);
manager.addDocument(
  'vi',
  'Thẻ giảm giá có được áp dụng khi đặt mua trà sữa trực tuyến không?',
  'FHSH27CB'
);
manager.addDocument(
  'vi',
  'Có thể sử dụng thẻ giảm giá để mua trà sữa trực tuyến không?',
  'FHSH27CB'
);
manager.addDocument(
  'vi',
  'Tôi có thể sử dụng thẻ giảm giá khi đặt mua trà sữa qua mạng không?',
  'FHSH27CB'
);
//Ans
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Đúng vậy! Bạn hoàn toàn có thể đặt mua trà sữa hàng ngày trên trang web của chúng tôi.'
);
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Đúng vậy, khi bạn đặt hàng, bạn có thể nhập mã giảm giá để áp dụng cho đơn hàng của mình. Hãy theo dõi và sử dụng những mã giảm giá tuyệt vời để nhận được ưu đãi đặc biệt cho đơn hàng của bạn nhé.'
);
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Tất nhiên, khi bạn đặt hàng, bạn có thể áp dụng mã giảm giá để giảm giá cho đơn hàng của bạn. Đừng quên kiểm tra và sử dụng những mã giảm giá tuyệt vời để có những ưu đãi tốt nhất cho đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Chắc chắn, khi bạn đặt hàng, bạn có thể nhập mã giảm giá để áp dụng cho đơn hàng của mình. Hãy theo dõi và áp dụng những mã giảm giá tuyệt vời để nhận được sự giảm giá đặc biệt cho đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Đương nhiên, khi bạn đặt hàng, bạn có thể áp dụng mã giảm giá cho đơn hàng của mình. Hãy chắc chắn rằng bạn theo dõi và sử dụng những mã giảm giá tuyệt vời để nhận được những ưu đãi đặc biệt cho đơn hàng của bạn.'
);
manager.addAnswer(
  'vi',
  'FHSH27CB',
  'Dĩ nhiên, khi bạn tiến hành đặt hàng, bạn có thể thêm mã giảm giá vào đơn hàng của bạn. Hãy luôn cập nhật và sử dụng những mã giảm giá tuyệt vời để nhận được những ưu đãi đặc biệt cho đơn hàng của bạn.'
);

//BHSH28DB
manager.addDocument(
  'vi',
  'Tôi cần phải trả phí giao hàng khi đặt mua trà sữa trực tuyến không?',
  'BHSH28DB'
);
manager.addDocument(
  'vi',
  'Tôi có phải trả phí vận chuyển khi đặt mua trà sữa trực tuyến không?',
  'BHSH28DB'
);
manager.addDocument('vi', 'Có mất phí giao hàng khi tôi mua trà sữa trực tuyến không?', 'BHSH28DB');
manager.addDocument(
  'vi',
  'Tôi cần phải trả phí vận chuyển khi đặt mua trà sữa qua mạng không?',
  'BHSH28DB'
);
manager.addDocument('vi', 'Phải trả phí giao hàng khi mua trà sữa online không?', 'BHSH28DB');
manager.addDocument(
  'vi',
  'Có phải trả phí vận chuyển khi đặt mua trà sữa qua internet không?',
  'BHSH28DB'
);
//Ans
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Có thể. Phí giao hàng phụ thuộc vào cửa hàng và khoảng cách giao hàng. Thông tin về phí giao hàng thường được hiển thị trước khi bạn hoàn tất đơn hàng.'
);
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Có, phụ thuộc vào cửa hàng và khoảng cách giao hàng, thông tin về phí giao hàng sẽ được hiển thị trước khi bạn hoàn tất đơn hàng.'
);
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Phí giao hàng sẽ được tính dựa trên cửa hàng và khoảng cách giao hàng. Trước khi hoàn tất đơn hàng, bạn sẽ thấy thông tin chi tiết về phí này.'
);
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Phí giao hàng sẽ khác nhau tùy thuộc vào cửa hàng và khoảng cách giao hàng. Bạn sẽ biết được thông tin về phí này trước khi hoàn tất việc đặt hàng.'
);
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Có, phí giao hàng được tính dựa trên cửa hàng và khoảng cách giao hàng. Trước khi bạn xác nhận đơn hàng, thông tin về phí sẽ được hiển thị rõ ràng.'
);
manager.addAnswer(
  'vi',
  'BHSH28DB',
  'Tùy thuộc vào cửa hàng và khoảng cách giao hàng, phí vận chuyển sẽ được tính toán. Bạn sẽ thấy thông tin chi tiết về phí này trước khi hoàn tất việc đặt hàng.'
);

//BHSH29LB
manager.addDocument(
  'vi',
  'Làm cách nào để tôi biết về thời gian mở cửa của cửa hàng trà sữa trực tuyến?',
  'BHSH29LB'
);
manager.addDocument(
  'vi',
  'Bạn có thể tìm hiểu về thời gian mở cửa của cửa hàng trà sữa trực tuyến bằng cách xem thông tin trên trang web hoặc ứng dụng của cửa hàng đó.',
  'BHSH29LB'
);
manager.addDocument(
  'vi',
  'Thông tin về thời gian mở cửa của cửa hàng trà sữa trực tuyến thường được hiển thị trên trang chủ hoặc trang liên hệ của cửa hàng.',
  'BHSH29LB'
);
manager.addDocument(
  'vi',
  'Để biết về thời gian mở cửa của cửa hàng trà sữa trực tuyến, bạn có thể kiểm tra trên trang mạng xã hội hoặc gọi điện thoại trực tiếp đến cửa hàng để được tư vấn.',
  'BHSH29LB'
);
manager.addDocument(
  'vi',
  'Thông tin về thời gian mở cửa của cửa hàng trà sữa trực tuyến thường được cập nhật trên trang Facebook hoặc trang web chính thức của cửa hàng.',
  'BHSH29LB'
);
manager.addDocument(
  'vi',
  'Để biết thời gian mở cửa của cửa hàng trà sữa trực tuyến, bạn có thể tham khảo các đánh giá hoặc bình luận từ khách hàng trước đó trên trang web hoặc ứng dụng của cửa hàng.',
  'BHSH29LB'
);
//Ans
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Thông tin về thời gian mở cửa thường có trên trang web của cửa hàng. Bạn hãy kiểm tra trước khi đặt hàng để chắc chắn rằng bạn mua trong khoảng thời gian cửa hàng mở cửa.'
);
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Thời gian mở cửa thường được hiển thị trên trang web của cửa hàng. Bạn nên kiểm tra trước khi đặt mua để đảm bảo bạn đặt hàng trong khoảng thời gian cửa hàng mở cửa.'
);
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Bạn nên xem trên trang web của cửa hàng để biết thời gian mở cửa. Điều này giúp bạn đảm bảo rằng bạn đặt hàng trong khoảng thời gian cửa hàng hoạt động.'
);
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Thông tin về thời gian mở cửa thường được hiển thị trên trang web của cửa hàng. Hãy kiểm tra trước khi đặt hàng để đảm bảo bạn chọn thời gian phù hợp.'
);
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Trang web của cửa hàng thường cung cấp thông tin về thời gian mở cửa. Bạn nên kiểm tra trước khi đặt hàng để đảm bảo bạn đặt trong khoảng thời gian cửa hàng hoạt động.'
);
manager.addAnswer(
  'vi',
  'BHSH29LB',
  'Để biết thời gian mở cửa, bạn có thể xem trên trang web của cửa hàng. Điều này giúp bạn đặt hàng trong khoảng thời gian cửa hàng mở cửa.'
);

//BHSH30SB
manager.addDocument(
  'vi',
  'Tôi có thể thay đổi phương thức thanh toán sau khi đã đặt hàng không?',
  'BHSH30SB'
);
manager.addDocument(
  'vi',
  'Sau khi đã đặt hàng, tôi có thể thay đổi phương thức thanh toán được không?',
  'BHSH30SB'
);
manager.addDocument(
  'vi',
  'Có cách nào để tôi thay đổi phương thức thanh toán sau khi đã hoàn tất đơn hàng không?',
  'BHSH30SB'
);
manager.addDocument(
  'vi',
  'Tôi muốn thay đổi phương thức thanh toán sau khi đã đặt hàng, làm thế nào để làm điều này?',
  'BHSH30SB'
);
manager.addDocument(
  'vi',
  'Nếu tôi muốn thay đổi phương thức thanh toán sau khi đã đặt mua, có phải tôi cần liên hệ với cửa hàng không?',
  'BHSH30SB'
);
manager.addDocument(
  'vi',
  'Có cho phép thay đổi phương thức thanh toán sau khi đã đặt hàng không? Nếu có, làm thế nào để thực hiện điều này?',
  'BHSH30SB'
);
//Ans
manager.addAnswer(
  'vi',
  'BHSH30SB',
  "Đương nhiên, bạn có thể lựa chọn giữa 2 phương thức thanh toán sau khi đã đặt hàng: 'Thanh toán khi nhận hàng' hoặc 'Thanh toán qua ví VNPay'."
);
manager.addAnswer(
  'vi',
  'BHSH30SB',
  "Có thể, sau khi đã đặt hàng, bạn có thể thay đổi phương thức thanh toán sang 'Thanh toán khi nhận hàng' hoặc 'Thanh toán qua ví VNPay'"
);
manager.addAnswer(
  'vi',
  'BHSH30SB',
  "Vâng, bạn hoàn toàn có thể thay đổi phương thức thanh toán sau khi đã đặt hàng. Bạn có thể chọn 'Thanh toán khi nhận hàng' hoặc 'Thanh toán qua ví VNPay'."
);
manager.addAnswer(
  'vi',
  'BHSH30SB',
  "Được, bạn có thể lựa chọn giữa 'Thanh toán khi nhận hàng' hoặc 'Thanh toán qua ví VNPay' sau khi đã đặt hàng."
);
manager.addAnswer(
  'vi',
  'BHSH30SB',
  "Tất nhiên, bạn có thể thay đổi phương thức thanh toán sau khi đã đặt hàng. Hai phương thức mà bạn có thể chọn là 'Thanh toán khi nhận hàng' hoặc 'Thanh toán qua ví VNPay'."
);

//BHSH31HB
manager.addDocument(
  'vi',
  'Tôi có thể đặt hàng trà sữa trong mục thời gian cố định không?',
  'BHSH31HB'
);
manager.addDocument('vi', 'Có giới hạn thời gian để đặt hàng trà sữa không?', 'BHSH31HB');
manager.addDocument(
  'vi',
  'Tôi cần biết liệu có thời gian cụ thể để đặt hàng trà sữa không?',
  'BHSH31HB'
);
manager.addDocument('vi', 'Trong khoảng thời gian nào tôi có thể đặt hàng trà sữa?', 'BHSH31HB');
manager.addDocument('vi', 'Có quy định về thời gian đặt hàng trà sữa không?', 'BHSH31HB');
manager.addDocument(
  'vi',
  'Tôi muốn biết liệu có giới hạn thời gian nào để đặt hàng trà sữa hay không?',
  'BHSH31HB'
);
//Ans
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Bất cứ khi nào khi bạn đặt hàng và trong thời gian hoạt động của hệ thống thì bạn có thể đặt hàng và nhận hàng'
);
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Bạn có thể đặt hàng và nhận hàng bất cứ khi nào trong thời gian hoạt động của hệ thống.'
);
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Trong khoảng thời gian hoạt động của hệ thống, bạn có thể đặt hàng và nhận hàng mọi lúc.'
);
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Hệ thống cho phép bạn đặt hàng và nhận hàng trong thời gian hoạt động của nó.'
);
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Khi hệ thống hoạt động, bạn có thể đặt hàng và nhận hàng theo ý muốn.'
);
manager.addAnswer(
  'vi',
  'BHSH31HB',
  'Bạn có thể tự do đặt hàng và nhận hàng trong thời gian hoạt động của hệ thống.'
);

//
manager.addDocument('vi', 'số lượng hàng tôi đã mua', 'bought_num');
manager.addDocument('vi', 'tôi đã mua bao nhiêu món đồ', 'bought_num');
manager.addDocument('vi', 'tôi đã đặt tổng cộng bao nhiêu đơn hàng', 'bought_num');
manager.addDocument('vi', 'số đơn hàng tôi đã đặt', 'bought_num');

manager.addAnswer('vi', 'bought_num', 'const a of =..[a]');
manager.addAnswer('vi', 'bought_num', 'const b of =..[b]');

manager.addDocument('vi', 'Lần gần nhất tôi mua hàng', 'lastest_buy');
manager.addDocument('vi', 'Lần cuối tôi mua hàng ở đây là khi nào thế', 'lastest_buy');
manager.addDocument('vi', 'Lần gần nhất tôi không mua là lúc nào', 'lastest_buy');

manager.save();
manager.train();

module.exports = manager;
