set :css_dir,     'css'
set :js_dir,      'js'
set :images_dir,  'img'
activate :directory_indexes

config[:file_watcher_ignore] += [ /\.pxm/ ]


# Use relative URLs
activate :relative_assets

set :relative_links, true

# Reload the browser automatically whenever files change
configure :development do
   activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end



# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# if ENV['deploy'] == 'git'
  activate :deploy do |deploy|
    deploy.method = :git
    deploy.build_before = true # default: false
    # Optional Settings
    # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
    # deploy.branch   = 'custom-branch' # default: gh-pages
    # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
    # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
  end
# else
#   activate :deploy do |deploy|
#     deploy.method = :rsync
#     deploy.host   = 'assets.integrated-internet.com'
#     deploy.path   = '/home/mblz/static/sites/builder'
#     # Optional Settings
#     deploy.user  = 'mblz' # no default
#     # deploy.port  = 5309 # ssh port, default: 22
#     # deploy.clean = true # remove orphaned files on remote host, default: false
#     # deploy.flags = '-rltgoDvzO --no-p --del' # add custom flags, default: -avz
#   end
# end
# with_layout :builder do
#   page "/builder/*"
# end

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes



# activate :deploy do |deploy|
#   deploy.method = :rsync
#   deploy.host   = 'git.vudmaska.com'
#   deploy.path   = '/home/deployer/static/shark'
#   # Optional Settings
#   deploy.user  = 'deployer' # no default
#   # deploy.port  = 5309 # ssh port, default: 22
#   # deploy.clean = true # remove orphaned files on remote host, default: false
#   # deploy.flags = '-rltgoDvzO --no-p --del' # add custom flags, default: -avz
# end
