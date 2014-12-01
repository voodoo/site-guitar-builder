module PathHelpers
  # def linky host
  #   link_to host, host, target: 'blank'  
  # end
  # def link_img path
  #   link_to(image_tag(path, class: 'img-responsive'), path, target: '_blank')
  # end
  # def in_dir_of?(dir)
  #   if current_page.url =~ /\/#{dir}\//
  #    {:class => 'active'} 
  #   else
  #     {}
  #   end    
  # end
  # def is_page_active(page)
  #   current_page.url == page ? {:class => 'active'} : {}
  # end

  # def next_article current_article
  #   blog.articles.each_with_index do |art, idx|
  #     if current_page.data.title == art.data.title
  #       return blog.articles[idx+1] || blog.articles.first
  #     end
  #   end
  # end
  # # def is_blog_page?
  # # 	if current_page.url =~ /\/blog\//
  # # 	 {:class => 'active'} 
  # # 	else
  # # 		{}
  # # 	end
  # # end
  # # def markdown
  # #   Redcarpet.new(yield).to_html
  # end  	
end