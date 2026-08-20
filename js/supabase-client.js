// ============================================================
// SUPABASE CLIENT CONFIGURATION
// الموقع الرسمي للنائب البرلماني الأستاذ مراد لعيداني
// ============================================================

const SUPABASE_URL = "https://vvufhimhsrbsnmtuqouk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dWZoaW1oc3Jic25tdHVxb3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzIwOTgsImV4cCI6MjEwMjgwODA5OH0.hGm4NUSHGeJeo6LR3W7RUhp9TvSzwYJfXe9Kd5broak";

// فحص وجود مكتبة Supabase
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// دوال مساعدة موحدة لقاعدة البيانات
window.db = {
  // 1. الشكاوى
  async getComplaints() {
    if (!supabaseClient) return (typeof getComplaints === 'function') ? getComplaints() : [];
    try {
      const { data, error } = await supabaseClient.from('complaints').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : (typeof getComplaints === 'function' ? getComplaints() : []);
    } catch(e) {
      console.warn("Supabase fallback to local:", e);
      return (typeof getComplaints === 'function') ? getComplaints() : [];
    }
  },

  async addComplaint(complaintData) {
    // إنشاء كائن الشكوى برقم مرجعي
    const count = Math.floor(1000 + Math.random() * 9000);
    const newId = `DZ-${new Date().getFullYear()}-${count}`;
    const item = {
      id: newId,
      name: complaintData.name,
      phone: complaintData.phone || '',
      email: complaintData.email || '',
      location: complaintData.location,
      type: complaintData.type,
      subject: complaintData.subject,
      details: complaintData.details,
      status: 'pending',
      response: '',
      created_at: new Date().toISOString()
    };

    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from('complaints').insert([item]);
        if (error) console.error("Supabase insert error:", error);
      } catch(e) { console.error("DB Insert error:", e); }
    }

    // حفظ محلي احتياطي أيضاً
    if (typeof addComplaint === 'function') {
      try { addComplaint(item); } catch(e) {}
    }

    return item;
  },

  async getComplaintById(refId) {
    if (!refId) return null;
    const cleanRef = refId.trim().toUpperCase();

    // 1. البحث أولاً في السحابة
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('complaints').select('*').eq('id', cleanRef).maybeSingle();
        if (data && !error) {
          return {
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            location: data.location,
            type: data.type,
            subject: data.subject,
            details: data.details,
            status: data.status,
            officialResponse: data.response || '',
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };
        }
      } catch(e) {
        console.warn("Supabase lookup fallback:", e);
      }
    }

    // 2. البحث الاحتياطي المحلي
    if (typeof getComplaintById === 'function') {
      return getComplaintById(cleanRef);
    }
    return null;
  },

  async updateComplaintStatus(id, newStatus, officialResponse = '') {
    if (supabaseClient) {
      try {
        await supabaseClient.from('complaints').update({
          status: newStatus,
          response: officialResponse,
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch(e) { console.error("Supabase update error:", e); }
    }
    if (typeof updateComplaintStatus === 'function') {
      try { updateComplaintStatus(id, newStatus, officialResponse); } catch(e) {}
    }
  },

  // 2. رسائل التواصل
  async addMessage(msg) {
    if (supabaseClient) {
      try {
        await supabaseClient.from('messages').insert([{
          name: msg.name,
          phone: msg.phone,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          is_read: false,
          created_at: new Date().toISOString()
        }]);
      } catch(e) { console.error("Supabase message error:", e); }
    }
    if (typeof addMessage === 'function') {
      try { addMessage(msg); } catch(e) {}
    }
  },

  async getMessages() {
    if (!supabaseClient) return (typeof getMessages === 'function') ? getMessages() : [];
    try {
      const { data, error } = await supabaseClient.from('messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : (typeof getMessages === 'function' ? getMessages() : []);
    } catch(e) {
      return (typeof getMessages === 'function') ? getMessages() : [];
    }
  }
};
