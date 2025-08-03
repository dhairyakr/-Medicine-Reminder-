@@ .. @@
 interface SidebarProps {
   onAddMedicine: () => void;
   onPageChange: (page: string) => void;
   currentPage: string;
-  onLogout: () => void;
 }

-const Sidebar: React.FC<SidebarProps> = ({ onAddMedicine, onPageChange, currentPage, onLogout }) => {
-  const userName = localStorage.getItem('userName') || 'User';
-  const userEmail = localStorage.getItem('userEmail') || '';
+const Sidebar: React.FC<SidebarProps> = ({ onAddMedicine, onPageChange, currentPage }) => {
+  const userName = 'User';
+  const userEmail = 'user@example.com';

   const NavButton = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
@@ .. @@
         </div>
       </div>

-      <button
-        onClick={onLogout}
-        className="mt-8 w-full flex items-center justify-center px-4 py-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
-      >
-        <LogOut className="w-5 h-5 mr-2" />
-        Sign Out
-      </button>
     </aside>
   );
 };