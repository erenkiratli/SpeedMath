@@ .. @@
         {/* Problem Display */}
         <motion.div
           key={`${problem.num1}-${problem.operation}-${problem.num2}`}
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-center mb-8"
         >
-          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight break-all">
-            {problem.num1} {problem.operation} {problem.num2} =
+          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
+            {problem.displayText ? (
+              <span>{problem.displayText} =</span>
+            ) : (
+              <span className="break-all">{problem.num1} {problem.operation} {problem.num2} =</span>
+            )}
           </div>