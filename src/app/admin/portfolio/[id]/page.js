"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin.module.css";

export default function PortfolioForm({ params }) {
    const { id } = use(params);
    const isNew = id === "new";
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Branding",
        image: "",
        link: "",
        order: 0,
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/portfolio/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data && !data.error) setFormData(data);
                });
        }
    }, [id, isNew]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadFormData,
            });
            const data = await res.json();
            if (data.imageUrl) {
                setFormData(prev => ({ ...prev, image: data.imageUrl }));
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isNew ? "/api/portfolio" : `/api/portfolio/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to save portfolio item");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "order" ? parseInt(value) : value });
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>{isNew ? "Add Portfolio Item" : "Edit Portfolio Item"}</h1>
                <button onClick={() => router.push("/admin")} className={styles.tabsBtn}>Back to Dashboard</button>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="Branding">Branding</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Visual Identity">Visual Identity</option>
                        <option value="3D Art">3D Art</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Image</label>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className={styles.fileInput} />
                    {uploading && <p className={styles.uploadStatus}>Uploading image...</p>}
                    {formData.image && (
                        <img src={formData.image} alt="Preview" className={styles.imagePreview} />
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
                </div>
                <div className={styles.formGroup}>
                    <label>Project Link</label>
                    <input name="link" value={formData.link} onChange={handleChange} placeholder="#" />
                </div>
                <div className={styles.formGroup}>
                    <label>Order</label>
                    <input name="order" type="number" value={formData.order} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className={styles.addBtn} disabled={loading || uploading}>
                        {loading ? "Saving..." : "Save Portfolio Item"}
                    </button>
                </div>
            </form>
        </div>
    );
}
