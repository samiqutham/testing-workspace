// // services/runtime-api.service.ts
// import axios, { AxiosError } from "axios";
// import { CONFIG } from "@workspace/ui/config/config";

// class RuntimeApiService {
//   // Generic request handler
//   private async request<T>(
//     url: string,
//     method: "GET" | "POST" = "POST",
//     payload: any = {}
//   ): Promise<T> {
//     try {
//       const response =
//         method === "POST"
//           ? await axios.post(url, payload, {
//               headers: { "Content-Type": "application/json" },
//             })
//           : await axios.get(url, {
//               headers: { "Content-Type": "application/json" },
//             });

//       return response.data as T;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const err = error as AxiosError;
//         console.error(
//           `[RuntimeApiService] Error calling ${url}:`,
//           err.response?.status,
//           err.response?.data || err.message
//         );
//       } else {
//         console.error(`[RuntimeApiService] Unknown error:`, error);
//       }
//       throw error;
//     }
//   }

//   // Example method: Exchange Type List
//   // async exchangeTypeListRuntime(): Promise<any> {
//   //   return this.request<any>(CONFIG.exchangeTypeList, "POST", {});
//   // }

//   // Example method: Trending List
//   async trendingListRuntime(): Promise<any> {
//     return this.request<any>(CONFIG.trendingList, "POST", {});
//   }
//   async competetionMarketList(id: any): Promise<any> {
//     return this.request<any>(CONFIG.competetionMarketList, "POST", {
//       competitionId: id,
//     });
//   }
//   async marketList(payload: any): Promise<any> {
//     return this.request<any>(CONFIG.marketList, "POST", payload);
//   }
//   async register(payload: any): Promise<any> {
//     return this.request<any>(CONFIG.register, "POST", payload);
//   }
  
//   async login(payload: any): Promise<any> {
//     return this.request<any>(CONFIG.login, "POST", payload);
//   }
//   async logout(): Promise<any> {
//     return this.request(CONFIG.logout, "POST"); // no payload needed
//   }
  
  
  

//   // You can add more methods without duplicating logic
//   async getSomethingElseRuntime(): Promise<any> {
//     // return this.request<any>(`${CONFIG.BASE_URL}/api/something`, "GET");
//   }
// }

// export const runtimeApiService = new RuntimeApiService();

// // import { runtimeApiService } from "@/services/runtime-api.service";
// //  runtimeApiService.exchangeTypeList().then((data) => {
// //       console.log("Exchange Types:", data);
// //     });




// services/runtime-api.service.ts
import axios, { AxiosError } from "axios";
import { CONFIG } from "@workspace/ui/config/config";

class RuntimeApiService {
  //  Token helpers (added only for logout usage)
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") || this.getCookie("authToken");
    }
    return null;
  }

  private getCookie(name: string): string | null {
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  private async request<T>(
    url: string,
    method: "GET" | "POST" = "POST",
    payload: any = {}
  ): Promise<T> {
    try {
      const response =
        method === "POST"
          ? await axios.post(url, payload, {
              headers: { "Content-Type": "application/json" },
            })
          : await axios.get(url, {
              headers: { "Content-Type": "application/json" },
            });

      return response.data as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        console.error(
          `[RuntimeApiService] Error calling ${url}:`,
          err.response?.status,
          err.response?.data || err.message
        );
      } else {
        console.error(`[RuntimeApiService] Unknown error:`, error);
      }
      throw error;
    }
  }

  async trendingListRuntime(): Promise<any> {
    return this.request<any>(CONFIG.trendingList, "POST", {});
  }

  async competetionMarketList(id: any): Promise<any> {
    return this.request<any>(CONFIG.competetionMarketList, "POST", {
      competitionId: id,
    });
  }
  async checkEmail(payload: { email: string }): Promise<any> {
    return this.request<any>(CONFIG.checkEmail, "POST", payload);
  }
  
  async checkUsername(payload: { username: string }): Promise<any> {
    return this.request<any>(CONFIG.checkUsername, "POST", payload);
  }

  async marketList(payload: any): Promise<any> {
    return this.request<any>(CONFIG.marketList, "POST", payload);
  }

  async register(payload: any): Promise<any> {
    return this.request<any>(CONFIG.register, "POST", payload);
  }
  async userBalanceAPI(payload: any): Promise<any> {
    return this.request<any>(CONFIG.userBalance, "POST", payload);
  }

  async login(payload: any): Promise<any> {
    return this.request<any>(CONFIG.login, "POST", payload);
  }

  // ✅ Only logout updated with Bearer token + withCredentials
  async logout(): Promise<any> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios.post(CONFIG.logout, {}, {
        headers,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        console.error(
          `[RuntimeApiService] Logout Error:`,
          err.response?.status,
          err.response?.data || err.message
        );
      } else {
        console.error(`[RuntimeApiService] Unknown logout error:`, error);
      }
      throw error;
    }
  }
}

export const runtimeApiService = new RuntimeApiService();