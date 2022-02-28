package jp.ac.osaka_u.ist.sel.nod4j.data.methodparam;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.ConstructorDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.Parameter;
import com.github.javaparser.ast.expr.ObjectCreationExpr;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.Stack;

/**
 * Get argument values
 *
 * @author k-simari
 * @author t-kanda
 */
public class AddParam {
	/**
	 * This function returns the information of the method parameters in the specified file.
	 *
	 * @param f path + filename (e.g., src/main/filename.java)
	 */
	public Map<String, ParamInfo> getParamInfo(File f, String filePath) {
		try {
			CompilationUnit unit = StaticJavaParser.parse(f);
			MethodParamVisitor v = new MethodParamVisitor();
			unit.accept(v, new CM(filePath));

			return v.methodParams;
		} catch (IOException e) {
			e.printStackTrace();
			return new HashMap<>();
		}
	}

	public class MethodParamVisitor extends VoidVisitorAdapter<CM> {

		private Map<String, ParamInfo> methodParams = new HashMap<>();

		private void addParams(CM cm, String argumentName, String type, int line) {
			ParamInfo tmp = methodParams.getOrDefault(cm.getClassName(), new ParamInfo());
			// System.out.println("P " + cm.getClassName() + " " + cm.currentMethodName + " " + argumentName + " " + line);
			tmp.put(cm.currentMethodName, argumentName, type, line);
			methodParams.put(cm.getClassName(), tmp);
		}

		@Override
		public void visit(ClassOrInterfaceDeclaration n, CM arg) {
			arg.currentClassName.push(n.getNameAsString());
			// System.out.println("C " + arg);
			super.visit(n, arg);
			arg.currentClassName.pop();
		}

		@Override
		public void visit(MethodDeclaration n, CM arg) {
			arg.currentMethodName = n.getNameAsString();
			// System.out.println("M " + arg);
			for (Parameter p : n.getParameters()) {
				addParams(arg, p.getNameAsString(), p.getTypeAsString(), p.getBegin().get().line);
			}
			super.visit(n, arg);
			arg.currentMethodName = "";
		}

		@Override
		public void visit(ConstructorDeclaration n, CM arg) {
			arg.currentMethodName = "<init>";
			for (Parameter p : n.getParameters()) {
				addParams(arg, p.getNameAsString(), p.getTypeAsString(), p.getBegin().get().line);
			}
			// System.out.println("m " + arg);
			super.visit(n, arg);
			arg.currentMethodName = "";
		}

		@Override
		public void visit(ObjectCreationExpr n, CM arg) {
			if (n.getAnonymousClassBody().isPresent()) {
				arg.currentClassName.push(Integer.toString(arg.anonymous++));
				// System.out.println("A " + arg);
				super.visit(n, arg);
				arg.currentClassName.pop();
			} else {
				super.visit(n, arg);
			}
		}
	}

	private class CM {

		String path;
		String currentMethodName = "";
		Stack<String> currentClassName = new Stack<>();
		int anonymous = 1;

		public CM(String filePath) {
			path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
		}

		@Override
		public String toString() {
			return getClassName() + ' ' + currentMethodName;
		}

		public String getClassName() {
			return path + String.join("$", currentClassName);
		}
	}
}
