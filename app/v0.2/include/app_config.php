<?php
/**
 * 项目常量定义模板，修改此文件后，后台修改网站基本信息，重新生成后生效。生成对应文件为app_config.php
 * 后台自动生成，请毋修改。最后更新时间: 2013-07-13 22:42:56
 *
 * @file            app_config.tpl
 * @package         Yab\Config
 * @version         0.2
 * @copyright       Copyright (c) 2013 {@link http://www.yablog.cn yablog} All rights reserved
 * @license         http://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0
 * @author          mrmsl <msl-138@163.com>
 * @date            2013-05-04 08:41:37
 * @lastmodify      2013-07-13 22:42:56
 */

//核心配置
define('DS'                 , '/');      //路径分割符

define('ADMIN_ID'           , 1);        //不可删除站长id
define('ADMIN_ROLE_ID'      , 1);        //不可删除，不可编辑权限站长角色id

define('ALLOW_AUTO_OPERATION_FUNCTION'  , ',time,get_client_ip,get_user_id,trim,'); //自动填充允许使用函数
define('ALLOW_AUTO_VALIDATE_FUNCTION'   , ',validate_dir,');                        //自动验证允许使用函数

//项目路径定义
define('PHP_EXT'            , '.class.php');                //php文件后缀
define('TEMPLATE_EXT'       , '.phtml');                    //模板文件后缀
define('SESSION_PATH'       , YAB_APP_PATH . 'sessions/');  //session保存目录
define('LOG_PATH'           , YAB_APP_PATH . 'logs/');      //日志目录
define('LIB_PATH'           , YAB_APP_PATH . 'lib' . DS);   //基类目录
define('APP_PATH'           , YAB_APP_PATH . 'modules/' . MODULE_NAME . DS);    //模块目录
define('BOOTSTRAP_FILE'     , APP_PATH . 'Bootstrap' . PHP_EXT);//ini文件
define('CONF_FILE'          , INCLUDE_PATH . '/application.ini');//ini文件
define('CACHE_PATH'         , YAB_APP_PATH . 'caches/');        //缓存目录
define('MODULE_CACHE_PATH'  , CACHE_PATH . 'modules/');         //系统模块信息缓存目录
define('LANG_PATH'          , CACHE_PATH . 'languages/');       //项目语言包目录
define('VIEW_PATH'          , APP_PATH . 'views/');             //模板目录
define('SSI_PATH'           , WWWROOT . 'ssi/');                //ssi服务器端包含目录
define('IMGCACHE_PATH'      , YAB_PATH . 'imgcache/');          //imgcache静态资源目录
define('UPLOAD_PATH'        , IMGCACHE_PATH . VERSION_PATH . 'upload' . DS);    //上传路径
define('FRONT_MODULE_NAME'  , 'front'); //前台模块名称

//网站配置定义
define('SESSION_ADMIN_KEY'     , '__admin__');      //管理员session key
define('PAGE_SIZE'             , 20);               //列表每页默认显示数
define('JSONP_CALLBACK'        , 'jsonpcallback');  //jsonp 请求名称
define('DEFAULT_LANG'          , 'zh_cn');          //默认语言
define('DEFAULT_TIMEZONE'      , 'asia/shanghai');  //默认时区

//评论留言
//类型
define('COMMENT_TYPE_GUESTBOOK'     , 0);//留言
define('COMMENT_TYPE_BLOG'          , 1);//博客评论
define('COMMENT_TYPE_MINIBLOG'      , 2);//微博评论

//审核状态
define('COMMENT_STATUS_UNAUDITING'  , 0);//未审核
define('COMMENT_STATUS_PASS'        , 1);//通过
define('COMMENT_STATUS_UNPASS'      , 2);//不通过

//回复类型
define('COMMENT_REPLY_TYPE_DEFAULT' , 0);//默认
define('COMMENT_REPLY_TYPE_REPLIED' , 1);//已经回复
define('COMMENT_REPLY_TYPE_ADMIN'   , 2);//管理员回复

//自定义错误类型
define('E_APP_EXCEPTION'      , 'E_APP_EXCEPTION');     //异常
define('E_APP_INFO'           , 'E_APP_INFO');          //信息
define('E_APP_DEBUG'          , 'E_APP_DEBUG');         //调试
define('E_APP_SQL'            , 'E_APP_SQL');           //SQL
define('E_APP_ROLLBACK_SQL'   , 'E_APP_ROLLBACK_SQL');  //事务回滚SQL

//日志类型
define('LOG_TYPE_ALL'                   , -1);//全部日志
define('LOG_TYPE_SQL_ERROR'             , 0); //sql错误
define('LOG_TYPE_SYSTEM_ERROR'          , 1); //系统错误
define('LOG_TYPE_ADMIN_OPERATE'         , 2); //管理员操作日志
define('LOG_TYPE_NO_PERMISSION'         , 3); //无权限操作
define('LOG_TYPE_ADMIN_LOGIN_INFO'      , 4); //后台登陆日志
define('LOG_TYPE_INVALID_PARAM'         , 5); //非法参数
define('LOG_TYPE_CRONTAB'               , 6); //定时任务
define('LOG_TYPE_VALIDATE_FORM_ERROR'   , 7); //验证表单错误
define('LOG_TYPE_VERIFYCODE_ERROR'      , 8); //验证码错误
define('LOG_TYPE_LOAD_SCRIPT_TIME'      , 9); //css及js加载时间
define('LOG_TYPE_SLOWQUERY'             , 10);//慢查询
define('LOG_TYPE_ROLLBACK_SQL'          , 11);//事务回滚sql
define('LOG_TYPE_EMAIL_FAILURE'         , 12);//邮件发送错误

//日志文件
define('LOG_SQL_ERROR'                  , 'sql_error');       //sql错误
define('LOG_SYSTEM_ERROR'               , 'system_error');    //系统错误
define('LOG_NO_PERMISSION'              , 'no_priv');         //无权限操作
define('LOG_INVALID_PARAM'              , 'invalid_param');   //非法参数
define('LOG_CRONTAB'                    , 'crontab');         //定时任务
define('LOG_VALIDATE_FORM_ERROR'        , 'form_error');      //验证表单错误
define('LOG_VERIFYCODE_ERROR'           , 'verifycode_error');//验证码错误
define('LOG_LOAD_SCRIPT_TIME'           , 'load_script_time');//css及js加载时间
define('LOG_SLOWQUERY'                  , 'slow_query');      //慢查询
define('LOG_ROLLBACK_SQL'               , 'rollback_sql');    //事务回滚sql
define('LOG_EMAIL_FAILURE'              , 'email_error');     //邮件发送错误

//发送邮件类型
define('MAIL_TYPE_MISC'                 , 0);   //其它类型
define('MAIL_TYPE_COMMMENTS_AT_EMAIL'   , 1);   //留言评论,有人回复我时通知我

define('MAIL_RESULT_SUCCESS'            , 10);  //发送成功
define('MAIL_RESULT_FAILURE'            , 11);  //发送失败

//状态码
define('HTTP_STATUS_UNLOGIN'          , 401);   //未登陆
define('HTTP_STATUS_NO_PRIV'          , 403);   //没有权限
define('HTTP_STATUS_SERVER_ERROR'     , 500);   //服务器错误

//验证码类型
define('VERIFY_CODE_TYPE_LETTERS'       , 0);       //大小写字母(a-zA-Z)
define('VERIFY_CODE_TYPE_LETTERS_UPPER' , 1);       //大写字母(A-Z)
define('VERIFY_CODE_TYPE_LETTERS_LOWER' , 2);       //小写字母(a-z)
define('VERIFY_CODE_TYPE_NUMERIC'       , 3);       //数字(0-9)');
define('VERIFY_CODE_TYPE_ALPHANUMERIC'  , 4);       //字母与数字(a-xA-Z0-9)
define('VERIFY_CODE_TYPE_ALPHANUMERIC_EXTEND', 5);  //字母与数字(a-xA-Z0-9)，排除容易混淆的字符oOLl和数字01

//杂项定义
define('REQUEST_TIME_MICRO'    , microtime(true));          //开始执行时间
define('SESSION_VERIFY_CODE'   , '_verify_code');            //验证码session key值
define('AUTO_CREATE_COMMENT'   , '//后台自动生成，请毋修改' . PHP_EOL . '//最后更新时间:%s' . PHP_EOL);  //后台生成缓存文件注释说明
define('__GET'                 , isset($_GET['__get']) && APP_DEBUG);                       //调试模式下，通过$_GET获取_POST数据
define('TAOBAO_IP_API'         , 'http://ip.taobao.com/service/getIpInfo.php?ip=');         //淘宝ip数据库接口地址

//=========================以下定义为后台自动生成===============================
//网站配置定义
define('WEB_DOMAIN'            , 'www.yablog.cn');//网站域名
define('WEB_DOMAIN_SCOPE'      , '.yablog.cn');//域名作用域
define('WEB_COOKIE_DOMAIN'     , WEB_DOMAIN_SCOPE);//cookie domain
define('WEB_SESSION_COOKIE_DOMAIN' , WEB_DOMAIN_SCOPE);//session cookie domain
define('WEB_HTTP_PROTOCOL'     , 'http');//http协议
define('WEB_BASE_PATH'         , 'v0.2/');////网站相对根目录
define('SITE_URL'              , WEB_HTTP_PROTOCOL . '://' . WEB_DOMAIN);//网站网址，不以/结束
define('WEB_SITE_URL'          , SITE_URL . '/');//网站网址，以/结束
define('BASE_SITE_URL'         , WEB_SITE_URL . WEB_BASE_PATH);//网站网址，包括网站根目录
define('WEB_ADMIN_ENTRY'       , BASE_SITE_URL . 'yabadmin.php');//管理员入口
define('WEB_JS_PATH'           , WWWROOT . 'static/js/');//js物理路径
define('WEB_JS_LANG_PATH'      , WEB_JS_PATH . 'lang/');//js语言包物理路径
define('WEB_CSS_PATH'          , WWWROOT . 'static/css/');//css物理路径
define('COMMON_IMGCACHE'       , 'http://imgcache.yablog.cn/common/');//imgcache
define('ADMIN_IMGCACHE'        , 'http://imgcache.yablog.cn/v0.2/admin/');//后台imgcache
define('IMGCACHE_JS'           , 'http://imgcache.yablog.cn/v0.2/front/js/');//js url
define('IMGCACHE_CSS'          , 'http://imgcache.yablog.cn/v0.2/front/css/');//css url
define('IMGCACHE_IMG'          , 'http://imgcache.yablog.cn/v0.2/front/images/');//img url
define('TITLE_SEPARATOR'       , ' ' . '-' . ' ');//标题分割符
define('BREAD_SEPARATOR'       , ' <span class="divider">' . '&raquo;' . '</span> ');//面包屑分割符

//session,cookie设置
define('SESSION_PREFIX'        , 'mrmsl');  //session前缀
define('COOKIE_EXPIRE'         , '0');   //过期时间
define('COOKIE_DOMAIN'         , WEB_COOKIE_DOMAIN);                 //作用域
define('COOKIE_PATH'           , '/');     //路径
define('COOKIE_PREFIX'         , 'mrmsl');   //前缀,避免冲突