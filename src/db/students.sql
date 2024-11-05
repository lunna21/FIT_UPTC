SELECT 
    p.full_name,
    ida.new_student_code,
    p.email,
    p.phone_number,
    ida.new_blood_type,
    ida.new_id_eps,
    ida.new_id_emecont,
    ida.change_instdetaud_timestamp
FROM INSCRIPTION_DETAIL_AUDIT ida
JOIN PERSONAS p ON ida.insdetail_id = p.id
WHERE ida.change_type = 'INSERT' 
    OR (ida.change_type = 'UPDATE' AND ida.audit_id IN (
        SELECT MAX(audit_id) 
        FROM INSCRIPTION_DETAIL_AUDIT 
        GROUP BY insdetail_id
    ))
ORDER BY ida.change_instdetaud_timestamp DESC;