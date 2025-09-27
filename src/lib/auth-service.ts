import users from "@/data/users.json";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthService {
  private static readonly AUTH_COOKIE_NAME = "auth_token";

  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      // Validate against our users array
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        return {
          success: false,
          error: "Invalid email or password. Please check your credentials.",
        };
      }

      // Create user data
      const userData = {
        id: user.id.toString(),
        name: user.email.split("@")[0],
        email: user.email,
      };

      // Set authentication cookie
      this.setAuthCookie(userData);

      return {
        success: true,
        user: userData,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  }

  /**
   * Check if user is authenticated by checking cookie
   */
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith(`${this.AUTH_COOKIE_NAME}=`));
  }

  /**
   * Get current user from cookie
   */
  static getCurrentUser(): { id: string; name: string; email: string } | null {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${this.AUTH_COOKIE_NAME}=`)
    );

    if (!authCookie) return null;

    try {
      const userData = JSON.parse(decodeURIComponent(authCookie.split("=")[1]));
      return userData;
    } catch {
      return null;
    }
  }

  /**
   * Logout user by clearing cookie
   */
  static logout(): void {
    if (typeof window === "undefined") return;

    document.cookie = `${this.AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Set authentication cookie
   */
  private static setAuthCookie(userData: {
    id: string;
    name: string;
    email: string;
  }): void {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

    document.cookie = `${this.AUTH_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(userData)
    )}; expires=${expires.toUTCString()}; path=/;`;
  }

  /**
   * Check if user exists in our database
   */
  static validateUser(email: string, password: string): boolean {
    return users.some((u) => u.email === email && u.password === password);
  }
}
