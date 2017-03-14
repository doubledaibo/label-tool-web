package configs;

public class Config {
	public static final String DB_DRIVER = "com.mysql.jdbc.Driver";
	public static final String DB_ADDRESS = "";
	public static final String DB_USER = "root";
	public static final String DB_PASSWD = "123456";
	
	public static final String AUTH_KEY = "";
	public static final String PASSWD_KEY = "";
	
	public static final String COOKIE_AUTH_NAME = "auth_data";
	public static final String COOKIE_AUTH_PATH = "/api/";
	public static final int COOKIE_AUTH_EXPIRE_TIME = 2 * 60 * 60;
	
	public static final String USER_INFO_NAME = "user_info";
}
